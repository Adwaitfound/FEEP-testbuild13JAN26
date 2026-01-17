import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Use the OLD service account to get data from old Firebase
const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json')

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ serviceAccountKey.json (old) not found')
  console.log('💡 We need the old Firebase service account to export phone numbers from the old project')
  process.exit(1)
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const run = async () => {
  console.log('🔄 Fetching user profiles from OLD Firebase project...')
  
  const snapshot = await db.collection('users').get()
  console.log(`📊 Found ${snapshot.size} user profiles`)
  
  const profiles = []
  snapshot.forEach(doc => {
    const data = doc.data()
    profiles.push({
      uid: doc.id,
      ...data
    })
  })
  
  // Save to JSON
  const outputPath = path.join(__dirname, '..', 'old-user-profiles.json')
  fs.writeFileSync(outputPath, JSON.stringify(profiles, null, 2))
  console.log(`✅ Exported to: old-user-profiles.json`)
  
  // Show sample
  const sample = profiles.slice(0, 3)
  console.log('\n📋 Sample data:')
  sample.forEach(p => {
    console.log({
      uid: p.uid,
      email: p.email,
      displayName: p.displayName,
      phone: p.phone || p.phoneNumber || 'NO PHONE',
      company: p.company || 'NO COMPANY'
    })
  })
  
  process.exit(0)
}

run().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
