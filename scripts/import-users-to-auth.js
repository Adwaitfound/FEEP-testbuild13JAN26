import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey-new.json')
const usersExportPath = path.join(__dirname, '..', 'users-export.json')

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ serviceAccountKey-new.json not found')
  process.exit(1)
}

if (!fs.existsSync(usersExportPath)) {
  console.error('❌ users-export.json not found')
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

const auth = admin.auth()
const results = []

const run = async () => {
  console.log(`🔄 Importing ${users.length} users to Firebase Auth...`)
  
  let created = 0
  let exists = 0
  let failed = 0

  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    
    try {
      // Try to get existing user first
      let authUser
      try {
        authUser = await auth.getUserByEmail(user.email)
        console.log(`⚠️  [${i + 1}/${users.length}] ${user.email} already exists`)
        exists += 1
        results.push({
          status: 'EXISTS',
          email: user.email,
          uid: authUser.uid,
          error: ''
        })
      } catch (err) {
        if (err.code === 'auth/user-not-found') {
          // Create new user with temporary password
          const tempPassword = Math.random().toString(36).slice(-16)
          
          authUser = await auth.createUser({
            email: user.email,
            password: tempPassword,
            displayName: user.displayName || '',
            disabled: false
          })
          
          // Send password reset link
          try {
            const resetLink = await auth.generatePasswordResetLink(user.email)
            console.log(`✅ [${i + 1}/${users.length}] ${user.email} created + reset link sent`)
            created += 1
            results.push({
              status: 'CREATED',
              email: user.email,
              uid: authUser.uid,
              resetLink: resetLink,
              error: ''
            })
          } catch (linkErr) {
            console.log(`✅ [${i + 1}/${users.length}] ${user.email} created (reset link send failed: ${linkErr.message})`)
            created += 1
            results.push({
              status: 'CREATED_NO_LINK',
              email: user.email,
              uid: authUser.uid,
              error: linkErr.message
            })
          }
        } else {
          throw err
        }
      }
    } catch (err) {
      console.error(`❌ [${i + 1}/${users.length}] ${user.email} failed:`, err.message)
      failed += 1
      results.push({
        status: 'FAILED',
        email: user.email,
        uid: '',
        error: err.message
      })
    }
  }

  // Write results summary
  const summary = {
    totalUsers: users.length,
    created,
    exists,
    failed,
    timestamp: new Date().toISOString(),
    results
  }

  const summaryPath = path.join(__dirname, '..', 'import-auth-results.json')
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2))

  console.log(`\n📊 Summary:`)
  console.log(`  ✅ Created: ${created}`)
  console.log(`  ⚠️  Already exist: ${exists}`)
  console.log(`  ❌ Failed: ${failed}`)
  console.log(`\n💾 Results saved to: import-auth-results.json`)

  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Import failed', err)
  process.exit(1)
})
