# 📋 FEEP Annual Event App - Development Rulebook

**Last Updated:** January 13, 2026  
**Status:** Active Development & Testing Phase

---

## 🎯 Project Overview

### Current Architecture

- **Old App (Production):** `eep-app-ea0e0` - 84 active users, DO NOT CHANGE
- **New App (Development):** `feep-annual-event-stable-jan26` - Clean slate for testing & improvements
- **Strategy:** Blue-green deployment (parallel running)

### Tech Stack

- **Frontend:** React 18.2, Vite 5.0, Tailwind CSS, React Router v6
- **State:** Zustand
- **Backend:** Firebase (Auth, Firestore, Storage, Messaging)
- **Build Tool:** Vite
- **Package Manager:** npm

---

## 🚀 Development Rules

### 1. Branch & Git Workflow

```bash
# NEVER commit directly to main
# Always create feature branches

git checkout -b feature/feature-name
git checkout -b fix/bug-name
git checkout -b test/experiment-name

# Branch naming:
# feature/* = new features
# fix/* = bug fixes
# test/* = experimental features
# docs/* = documentation updates
```

**Commit Messages:**

```
✨ feat: Add dark mode toggle
🐛 fix: Resolve login redirect bug
📝 docs: Update API documentation
🧪 test: Add unit tests for auth
```

### 2. Environment Files

**NEVER commit:**

- `.env` - Contains Firebase credentials
- `.env.local` - Local development secrets
- `**/node_modules/**`
- `.firebase/`
- `dist/` (except when deploying)

**Always in `.gitignore`:**

```
.env
.env.local
serviceAccountKey.json
serviceAccountKey-new.json
node_modules/
.firebase/
dist/
```

### 3. Code Quality Standards

#### Formatting

```bash
# Format code before committing
npm run format

# Check for linting issues
npm run lint
```

#### File Structure

```
src/
├── components/        # Reusable UI components
│   ├── common/       # Button, Input, Card, Loading
│   ├── icons/        # Icon components
│   └── Layout.jsx    # Main layout
├── screens/          # Full page screens
│   ├── auth/         # Login, Register, Profile Setup
│   ├── home/         # Home screen
│   └── ...other screens
├── services/         # External services
│   └── firebase/     # Firebase services
├── store/            # Zustand state management
├── context/          # React Context
├── utils/            # Helper functions
├── styles/           # Global CSS
└── App.jsx          # Main app component
```

#### Component Guidelines

- **Functional components only** (no class components)
- **Use hooks** (useState, useEffect, useContext)
- **Prop validation** (TypeScript or PropTypes)
- **One component per file** (unless very small)
- **Descriptive names:** `UserProfileCard.jsx` not `Card.jsx`

#### Naming Conventions

```javascript
// Components - PascalCase
const UserProfile = () => {};

// Functions & Variables - camelCase
const getUserData = () => {};
const isLoggedIn = true;

// Constants - UPPER_SNAKE_CASE
const API_KEY = "xyz...";
const MAX_RETRIES = 3;

// Classes/Types - PascalCase
class AuthService {}
```

### 4. Firebase Best Practices

#### Authentication

- ✅ Use Firebase Auth for all login/signup
- ✅ Always check user authentication before showing protected content
- ✅ Use `PrivateRoute` and `PublicRoute` components for route protection
- ❌ Never store passwords in Firestore
- ❌ Never expose API keys in client code (use environment variables)

#### Firestore Rules

- ✅ Follow security rules in `firestore.rules`
- ✅ Validate data before writing
- ✅ Use appropriate access levels (user, admin, public)
- ❌ Never open database to public without rules

#### Cloud Storage

- ✅ Follow security rules in `storage.rules`
- ✅ Validate file types and sizes
- ✅ Use user IDs in file paths for organization
- ❌ Never allow unauthenticated uploads

### 5. Development Workflow

#### Starting Development

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature

# 3. Install dependencies (if needed)
npm install

# 4. Start dev server
npm run dev

# Opens at http://localhost:5173
```

#### Making Changes

```bash
# 1. Make your code changes
# 2. Test thoroughly in browser
# 3. Run linter & formatter
npm run lint
npm run format

# 4. Commit changes
git add .
git commit -m "✨ feat: Description of changes"

# 5. Push to remote
git push origin feature/your-feature
```

#### Testing Before Deploy

1. ✅ Test on local dev server (`npm run dev`)
2. ✅ Test all features you modified
3. ✅ Check mobile responsiveness
4. ✅ Verify no console errors
5. ✅ Test with different browsers if possible

### 6. Deployment Rules

#### New App Only (`feep-annual-event-stable-jan26`)

```bash
# Build for production
npm run build

# Deploy to Firebase
npm run deploy
# OR
firebase deploy --project feep-annual-event-stable-jan26
```

**⚠️ CRITICAL: Never modify old app Firebase credentials or data**

#### Deployment Checklist

- ✅ Code is tested locally
- ✅ No console errors
- ✅ Environment variables are correct
- ✅ `.env` is NOT committed
- ✅ Build completes without warnings
- ✅ Feature branch is up to date with main

### 7. Testing Protocol

#### Before Committing

```bash
# 1. Manual testing in browser
npm run dev

# 2. Check for console errors (F12)
# 3. Test all modified features
# 4. Test responsive design (mobile/tablet)
```

#### Feature Testing Checklist

- ✅ Feature works as intended
- ✅ Edge cases handled (empty states, errors)
- ✅ Mobile friendly
- ✅ No broken links
- ✅ No console warnings/errors
- ✅ Performance acceptable (no lag)

### 8. Firebase Data Structure

#### Firestore Collections

```
users/
  {userId}/
    - email
    - displayName
    - photoURL
    - createdAt
    - bio
    - etc.

events/
  {eventId}/
    - title
    - date
    - location
    - etc.

schedule/
  {scheduleId}/
    - eventId
    - time
    - description
    - etc.
```

**Rules:**

- Use user IDs as document IDs in `users/` collection
- Timestamp new records automatically
- Validate data structure before saving
- Don't store sensitive data (passwords, tokens)

### 9. Error Handling

#### Always Catch Errors

```javascript
try {
  await firebaseOperation();
} catch (error) {
  console.error("Operation failed:", error);
  // Show user-friendly error message
  showNotification("Something went wrong. Please try again.");
}
```

#### User Feedback

- ✅ Show loading states during operations
- ✅ Show success/error messages
- ✅ Disable buttons during operations
- ✅ Clear, friendly error messages

### 10. Code Review Checklist

Before merging to main, verify:

- ✅ Code follows style guide
- ✅ No hardcoded values/credentials
- ✅ Comments for complex logic
- ✅ Proper error handling
- ✅ Tested on local dev server
- ✅ `.env` not committed
- ✅ Build completes successfully
- ✅ No console errors/warnings

---

## 📱 Responsive Design Standards

### Breakpoints

```css
/* Mobile first approach */
/* Mobile: < 640px */
/* Tablet: 640px - 1024px */
/* Desktop: > 1024px */

/* Use Tailwind classes: sm, md, lg, xl, 2xl */
<div className="text-sm md:text-base lg:text-lg">
```

### Testing

- ✅ Test on real mobile device if possible
- ✅ Use Chrome DevTools mobile emulation
- ✅ Test at 375px (iPhone SE), 768px (iPad), 1920px (desktop)

---

## 🔒 Security Rules

### General

1. ✅ Always use HTTPS links
2. ✅ Validate all user inputs
3. ✅ Never log sensitive data
4. ✅ Keep dependencies updated
5. ✅ Use environment variables for secrets

### Firebase Security

1. ✅ Verify user authentication before DB access
2. ✅ Implement Firestore security rules
3. ✅ Validate data on both client and server
4. ✅ Use strong authentication methods
5. ✅ Rotate API keys regularly

### Code Security

```javascript
// ❌ WRONG - Exposing secrets
const API_KEY = "AIza..."; // in code

// ✅ RIGHT - Using environment variables
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
```

---

## 📦 Package Management

### Adding Dependencies

```bash
# Always use npm (not yarn or pnpm)
npm install package-name

# For dev dependencies
npm install --save-dev package-name

# Update package.json
git add package.json package-lock.json
git commit -m "📦 deps: Add new-package"
```

### Dependencies Review

- ✅ Check package size before installing
- ✅ Prefer smaller, focused packages
- ✅ Keep number of dependencies minimal
- ✅ Regularly update and audit

```bash
npm audit
npm update
```

---

## 📊 Folder Structure Rules

### Keep It Organized

```
FEEP-Stablebuild13JAN26/
├── src/               # All source code
├── public/            # Static files
├── dist/              # Production build (git ignored)
├── functions/         # Cloud Functions
├── scripts/           # Utility scripts
├── .env               # Secrets (git ignored)
├── package.json       # Dependencies
├── vite.config.js     # Build config
├── firebase.json      # Firebase config
└── README.md          # Documentation
```

### File Organization

- One component per file
- Related files in same folder
- No orphaned files in root
- Clear, descriptive names

---

## 🚨 Critical Do's and Don'ts

### ✅ DO

- ✅ Test before pushing
- ✅ Write meaningful commit messages
- ✅ Use feature branches
- ✅ Follow naming conventions
- ✅ Handle errors gracefully
- ✅ Validate user input
- ✅ Use environment variables
- ✅ Document complex logic
- ✅ Run linter & formatter
- ✅ Communicate changes

### ❌ DON'T

- ❌ Commit `.env` files
- ❌ Push directly to main
- ❌ Modify old app (`eep-app-ea0e0`)
- ❌ Hardcode secrets/API keys
- ❌ Ignore console errors
- ❌ Skip testing
- ❌ Deploy without testing
- ❌ Use `var` (use `const`/`let`)
- ❌ Create huge components
- ❌ Ignore security warnings

---

## 🎓 Common Tasks

### Add New Feature

1. Create branch: `git checkout -b feature/new-feature`
2. Build component/feature
3. Test locally: `npm run dev`
4. Format: `npm run format`
5. Commit: `git commit -m "✨ feat: ..."`
6. Push: `git push origin feature/new-feature`

### Fix Bug

1. Create branch: `git checkout -b fix/bug-name`
2. Fix the issue
3. Test thoroughly
4. Commit: `git commit -m "🐛 fix: ..."`
5. Push and merge

### Deploy to Live

```bash
# Test locally first
npm run dev

# Build
npm run build

# Deploy
npm run deploy
# (or firebase deploy --project feep-annual-event-stable-jan26)
```

---

## 📞 Support & Questions

### Resources

- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Firebase Docs:** https://firebase.google.com/docs
- **Tailwind CSS:** https://tailwindcss.com
- **Zustand:** https://zustand-demo.vercel.app

### Common Issues

See `README.md` for troubleshooting

---

## 🔄 Version Control

### Important Branches

- `main` - Production ready code (DO NOT push directly)
- `develop` - Integration branch (if used)
- `feature/*` - Feature development
- `fix/*` - Bug fixes

### Pull Request Process

1. Push to feature branch
2. Create Pull Request on GitHub
3. Request code review
4. Address feedback
5. Merge when approved

---

## ✨ Before Every Coding Session

1. ✅ Read this rulebook
2. ✅ Run `git pull origin main`
3. ✅ Create feature branch
4. ✅ Run `npm install` (if needed)
5. ✅ Start dev server: `npm run dev`
6. ✅ Make your changes
7. ✅ Test thoroughly
8. ✅ Run `npm run lint` & `npm run format`
9. ✅ Commit & push
10. ✅ Deploy when ready

---

**Last Updated:** January 13, 2026  
**Current Status:** Development & Testing Phase  
**Next Review:** January 27, 2026

---

> Remember: This is a blue-green deployment. Old app is production. New app is for testing and improvements.
> Always test on new app first before considering changes to old app.
