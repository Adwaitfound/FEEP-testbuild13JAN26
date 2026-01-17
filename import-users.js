import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load new service account key
const newServiceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey-new.json', 'utf8'));

async function importUsers() {
  try {
    console.log('🔄 Importing users to new Firebase project...\n');
    
    // Load exported users
    const usersPath = path.join(__dirname, 'users-export.json');
    if (!fs.existsSync(usersPath)) {
      throw new Error('users-export.json not found. Run export-users.js first.');
    }

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    console.log(`📥 Loaded ${users.length} users from export\n`);

    // Initialize new project - use default app
    if (admin.apps.length > 0) {
      await admin.app().delete();
    }

    admin.initializeApp({
      credential: admin.credential.cert(newServiceAccount)
    });

    const auth = admin.auth();
    const results = [];

    // Import users
    console.log('⚙️  Creating users in new Firebase project...\n');
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const progress = `[${i + 1}/${users.length}]`;

      try {
        // Generate a temporary random password
        const tempPassword = Math.random().toString(36).slice(-16);

        const userData = {
          email: user.email,
          password: tempPassword,
          disabled: false
        };

        if (user.displayName) userData.displayName = user.displayName;
        if (user.photoURL && user.photoURL.startsWith('http')) userData.photoURL = user.photoURL;

        // Create user
        const newUser = await auth.createUser(userData);

        results.push({
          status: 'OK',
          email: user.email,
          oldUid: user.uid,
          newUid: newUser.uid,
          error: ''
        });

        console.log(`${progress} ✓ ${user.email}`);
      } catch (err) {
        // Check if email already exists
        if (err.code === 'auth/email-already-exists') {
          results.push({
            status: 'EXISTS',
            email: user.email,
            oldUid: user.uid,
            newUid: '',
            error: 'Email already exists in new project'
          });
          console.log(`${progress} ⚠️  ${user.email} (already exists)`);
        } else {
          results.push({
            status: 'FAIL',
            email: user.email,
            oldUid: user.uid,
            newUid: '',
            error: err.message
          });
          console.log(`${progress} ✗ ${user.email} - ${err.message}`);
        }
      }
    }

    // Save results
    const csvPath = path.join(__dirname, 'import-results.csv');
    const csvHeader = 'Status,Email,Old UID,New UID,Error\n';
    const csvRows = results.map(r => 
      `${r.status},"${r.email}","${r.oldUid}","${r.newUid}","${r.error}"`
    ).join('\n');
    fs.writeFileSync(csvPath, csvHeader + csvRows);

    const ok = results.filter(r => r.status === 'OK').length;
    const exists = results.filter(r => r.status === 'EXISTS').length;
    const fail = results.filter(r => r.status === 'FAIL').length;

    console.log('\n' + '='.repeat(60));
    console.log('📊 IMPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Created: ${ok}`);
    console.log(`⚠️  Already exist: ${exists}`);
    console.log(`❌ Failed: ${fail}`);
    console.log(`📄 Results: ${csvPath}`);
    console.log('='.repeat(60));

    if (ok > 0) {
      console.log('\n✨ User import completed!');
      console.log(`\n📝 IMPORTANT NOTES:`);
      console.log(`• ${ok} users created with temporary passwords`);
      console.log(`• Users must reset password on first login`);
      console.log(`• Send password reset emails to users:\n`);

      // List emails for reset
      const createdEmails = results.filter(r => r.status === 'OK').map(r => r.email);
      console.log(createdEmails.join('\n'));
    }

    process.exit(fail > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

importUsers();
