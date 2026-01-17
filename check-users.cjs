const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function checkUsers() {
  try {
    const snapshot = await db.collection('users').get();
    
    if (snapshot.empty) {
      console.log('❌ No registered users found in the database.');
      return;
    }
    
    console.log('✅ Total registered users:', snapshot.size);
    console.log('\n📋 User details:');
    console.log('═'.repeat(80));
    
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log('🆔 User ID:', doc.id);
      console.log('👤 Name:', data.name || data.displayName || 'N/A');
      console.log('📧 Email:', data.email || 'N/A');
      console.log('📅 Created:', data.createdAt ? new Date(data.createdAt.toDate()).toLocaleDateString() : 'N/A');
      console.log('🎫 Role:', data.role || 'N/A');
      console.log('-'.repeat(80));
    });
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
  } finally {
    process.exit(0);
  }
}

checkUsers();
