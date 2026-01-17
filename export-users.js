import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load old service account key
const oldServiceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

async function exportUsers() {
  try {
    console.log('🔄 Exporting users from old Firebase project...\n');
    
    // Initialize old project
    admin.initializeApp({
      credential: admin.credential.cert(oldServiceAccount)
    });

    const auth = admin.auth();
    const users = [];
    let pageToken;
    let page = 1;

    // Fetch all users
    console.log('📥 Fetching users from eep-app-ea0e0...');
    do {
      const listResult = await auth.listUsers(1000, pageToken);
      
      for (const user of listResult.users) {
        users.push({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || null,
          photoURL: user.photoURL || null,
          disabled: user.disabled,
          emailVerified: user.emailVerified,
          metadata: {
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime
          }
        });
      }

      console.log(`   Page ${page}: ${listResult.users.length} users`);
      pageToken = listResult.pageToken;
      page++;
    } while (pageToken);

    console.log(`\n✅ Total users exported: ${users.length}\n`);

    // Save to JSON file
    const jsonPath = path.join(__dirname, 'users-export.json');
    fs.writeFileSync(jsonPath, JSON.stringify(users, null, 2));
    console.log(`📄 Saved to: ${jsonPath}\n`);

    // Also create a CSV for reference
    const csvPath = path.join(__dirname, 'users-export.csv');
    const csvHeader = 'UID,Email,Display Name,Email Verified,Created\n';
    const csvRows = users.map(u => 
      `"${u.uid}","${u.email}","${u.displayName || ''}",${u.emailVerified},"${u.metadata.creationTime}"`
    ).join('\n');
    fs.writeFileSync(csvPath, csvHeader + csvRows);
    console.log(`📄 Also saved CSV: ${csvPath}\n`);

    console.log('='.repeat(60));
    console.log('📋 USER EXPORT COMPLETE');
    console.log('='.repeat(60));
    console.log(`Total users: ${users.length}`);
    console.log(`Files created:`);
    console.log(`  • users-export.json (full details)`);
    console.log(`  • users-export.csv (quick reference)`);
    console.log('='.repeat(60));
    console.log('\n✨ Next steps:');
    console.log('1. Review the exported files');
    console.log('2. Users can register on the new app with their email');
    console.log('3. Or send them email invites to migrate accounts\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

exportUsers();
