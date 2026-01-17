import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey-new.json')
const scheduleDataPath = path.join(__dirname, '..', 'schedule-data.js')

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ serviceAccountKey-new.json not found')
  process.exit(1)
}

if (!fs.existsSync(scheduleDataPath)) {
  console.error('❌ schedule-data.js not found')
  process.exit(1)
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))

// Dynamically import schedule data
let scheduleData
try {
  const module = await import(scheduleDataPath)
  scheduleData = module.scheduleData || []
} catch (err) {
  console.error('❌ Failed to load schedule-data.js:', err.message)
  process.exit(1)
}

if (!Array.isArray(scheduleData) || scheduleData.length === 0) {
  console.error('❌ schedule-data.js exports no data')
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
  console.log(`🔄 Seeding schedule with ${scheduleData.length} sessions...`)
  const writer = db.bulkWriter()

  writer.onWriteError((err) => {
    console.error('Write error:', err.message)
    return false
  })

  let written = 0
  for (const session of scheduleData) {
    const ref = db.collection('sessions').doc()
    writer.set(ref, {
      ...session,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      registered: 0, // Number of registered participants
      capacity: session.capacity || 100,
    }, { merge: true })
    written += 1
    if (written % 50 === 0) console.log(`...queued ${written}`)
  }

  await writer.close()
  console.log(`✅ Completed. Sessions written: ${written}`)
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Failed seeding schedule', err)
  process.exit(1)
})
