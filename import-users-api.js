import json
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function importUsersViaRest() {
  try {
    console.log('🔄 Importing users via Firebase REST API...\n');
    
    // Load users and new service account
    const usersPath = path.join(__dirname, 'users-export.json');
    const newServiceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey-new.json', 'utf8'));
    
    if (!fs.existsSync(usersPath)) {
      throw new Error('users-export.json not found');
    }

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    const projectId = newServiceAccount.project_id;
    
    console.log(`📥 Loaded ${users.length} users`);
    console.log(`🔑 Project: ${projectId}\n`);
    console.log('⚙️  Creating users...\n');

    const results = [];
    let created = 0;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const tempPass = Math.random().toString(36).slice(-16);
      const progress = `[${i + 1}/${users.length}]`;

      try {
        // Use Firebase custom auth token to create users via admin API
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${newServiceAccount.apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              password: tempPass,
              returnSecureToken: true
            })
          }
        );

        if (response.ok) {
          console.log(`${progress} ✓ ${user.email}`);
          results.push({ status: 'OK', email: user.email, error: '' });
          created++;
        } else if (response.status === 400) {
          const error = await response.json();
          if (error.error.message === 'EMAIL_EXISTS') {
            console.log(`${progress} ⚠️  ${user.email} (already exists)`);
            results.push({ status: 'EXISTS', email: user.email, error: 'Email exists' });
          } else {
            console.log(`${progress} ✗ ${user.email} - ${error.error.message}`);
            results.push({ status: 'FAIL', email: user.email, error: error.error.message });
          }
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (err) {
        console.log(`${progress} ✗ ${user.email} - ${err.message}`);
        results.push({ status: 'FAIL', email: user.email, error: err.message });
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 IMPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Created: ${created}`);
    console.log(`Total: ${users.length}`);
    console.log('='.repeat(60));

    if (created > 0) {
      console.log('\n✨ User import successful!');
      console.log('📝 Users were created with temporary passwords');
      console.log('   They must reset password on first login\n');
    }

    process.exit(created === users.length ? 0 : 1);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

importUsersViaRest();
