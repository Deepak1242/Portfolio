# Next.js Upgrade Instructions

## Prerequisites
1. Free up disk space (at least 2GB recommended)
2. Backup your project

## Step 1: Clean Installation
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install dependencies fresh
npm install
```

## Step 2: Update Next.js and React
```bash
# Update to latest versions
npm install next@latest react@latest react-dom@latest

# Update TypeScript and ESLint
npm install -D typescript@latest eslint@latest eslint-config-next@latest
```

## Step 3: Update package.json dependencies
Update these key dependencies:
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@heroicons/react": "^2.1.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

## Step 4: Configuration Updates

### Update next.config.js (already done)
The remotePatterns configuration is already updated for Next.js 15 compatibility.

### Update tsconfig.json
Add these compiler options:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Step 5: Test and Fix Breaking Changes

### Image Component Updates
- `domains` is deprecated, use `remotePatterns` (already done)
- Update any custom image loaders if used

### App Router Updates
- Ensure all API routes use proper Response objects
- Update metadata exports in page components

### Framer Motion Updates
```bash
npm install framer-motion@latest
```

## Step 6: Run and Test
```bash
# Start development server
npm run dev

# Test all functionality:
# - Image loading (projects, certifications)
# - API endpoints
# - Navigation
# - Admin features
```

## Common Issues and Fixes

### 1. ESLint Configuration
If ESLint errors occur, update `.eslintrc.json`:
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}
```

### 2. Prisma Compatibility
Ensure Prisma is compatible:
```bash
npm install prisma@latest @prisma/client@latest
npx prisma generate
```

### 3. TypeScript Errors
Update type imports:
```typescript
// Old
import type { NextApiRequest, NextApiResponse } from 'next'

// New (if using App Router)
import { NextRequest, NextResponse } from 'next/server'
```

## Verification Checklist
- [ ] Project builds without errors (`npm run build`)
- [ ] All images load correctly
- [ ] API endpoints work
- [ ] No console errors
- [ ] Admin functionality works
- [ ] Database operations work
