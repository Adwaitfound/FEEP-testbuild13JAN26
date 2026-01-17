import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load service account keys
const oldServiceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));
const newServiceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey-new.json', 'utf8'));

async function migrateUsers() {
  try {
    console.log('🔄 Starting user migration...\n');
    
    // Initialize old project
    const oldApp = admin.initializeApp(
      { credential: admin.credential.cert(oldServiceAccount) },
      'old'
    );
    const oldAuth = admin.app('old').auth();

    // Get all users
    console.log('📥 Fetching users from eep-app-ea0e0...');
    const users = [];
    let pageToken;
    let page = 1;

    do {
      const listResult = await oldAuth.listUsers(1000, pageToken);
      users.push(...listResult.users);
      console.log(`   Page ${page}: ${listResult.users.length} users`);
      pageToken = listResult.pageToken;
      page++;
    } while (pageToken);

    await oldApp.delete();
    console.log(`\n✅ Found ${users.length} users total\n`);

    // Initialize new project
    const newApp = admin.initializeApp(
      { credential: admin.credential.cert(newServiceAccount) },
      'new'
    );
    const newAuth = admin.app('new').auth();

    const results = [];

    // Migrate users
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const progress = `[${i + 1}/${users.length}]`;

      try {
        const tempPass = Math.random().toString(36).slice(-16);
        const userData = {
          email: user.email,
          password: tempPass,
          disabled: false
        };

        if (user.displayName) userData.displayName = user.displayName;
        if (user.photoURL && user.photoURL.startsWith('http')) userData.photoURL = user.photoURL;

        const newUser = await newAuth.createUser(userData);
        results.push({ status: 'OK', email: user.email, newUid: newUser.uid, error: '' });
        console.log(`${progress} ✓ ${user.email}`);
      } catch (err) {
        results.push({ status: 'FAIL', email: user.email, newUid: '', error: err.message });
        console.log(`${progress} ✗ ${user.email} - ${err.message}`);
      }
    }

    // Save CSV
    const csvPath = path.join(__dirname, 'migration-results.csv');
    const header = 'Status,Email,New UID,Error\n';
    const rows = results.map(r => `${r.status},"${r.email}","${r.newUid}","${r.error}"`).join('\n');
    fs.writeFileSync(csvPath, header + rows);

    const ok = results.filter(r => r.status === 'OK').length;
    const fail = results.filter(r => r.status === 'FAIL').length;

    console.log('\n' + '='.repeat(60));
    console.log(`✅ Successful: ${ok} | ❌ Failed: ${fail}`);
    console.log(`📄 Results: ${csvPath}`);
    console.log('='.repeat(60));

    await newApp.delete();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

migrateUsers();
