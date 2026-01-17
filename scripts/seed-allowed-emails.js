import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Adjust if your service account filename differs
const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey-new.json')
const usersExportPath = path.join(__dirname, '..', 'users-export.json')

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ serviceAccountKey-new.json not found at', serviceAccountPath)
  process.exit(1)
}

if (!fs.existsSync(usersExportPath)) {
  console.error('❌ users-export.json not found at', usersExportPath)
  process.exit(1)
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
const users = JSON.parse(fs.readFileSync(usersExportPath, 'utf8'))

if (!Array.isArray(users) || users.length === 0) {
  console.error('❌ users-export.json has no users')
  process.exit(1)
}

if (admin.apps.length > 0) {
  await admin.app().delete()
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const run = async () => {
  console.log(`🔄 Seeding allowlist for ${users.length} users...`)
  const writer = db.bulkWriter()

  writer.onWriteError((err) => {
    console.error('Write error:', err.message)
    return false
  })

  let written = 0
  for (const user of users) {
    const email = user.email?.trim().toLowerCase()
    if (!email) continue
    const ref = db.collection('allowedEmails').doc(email)
    writer.set(ref, {
      allowed: true,
      migratedFrom: 'legacy',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true })
    written += 1
    if (written % 50 === 0) console.log(`...queued ${written}`)
  }

  await writer.close()
  console.log(`✅ Completed. Documents written: ${written}`)
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Failed seeding allowlist', err)
  process.exit(1)
})
