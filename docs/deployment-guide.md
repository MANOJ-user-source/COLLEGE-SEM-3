# GitHub Pages Deployment Guide

## Overview
Step-by-step instructions for deploying the interactive 3D website to GitHub Pages.

---

## Prerequisites

### Required Accounts & Tools
- [ ] GitHub account created
- [ ] Git installed on your computer
- [ ] Node.js and npm installed
- [ ] Code editor (VS Code recommended)

### Check Installation
```bash
# Check Git
git --version

# Check Node.js
node --version

# Check npm
npm --version
```

---

## Part 1: Local Project Setup

### Step 1: Initialize Git Repository
```bash
# Navigate to project folder
cd "c:\COLLEGE SEM-3\interactive-3d-website"

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Project setup"
```

### Step 2: Create .gitignore File
Create a `.gitignore` file in your project root:
```
# Dependencies
node_modules/
package-lock.json

# Build output
dist/
build/

# Environment files
.env
.env.local

# Editor directories
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Debug logs
npm-debug.log*
yarn-debug.log*
```

---

## Part 2: GitHub Repository Setup

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon in top right corner
3. Select "New repository"
4. Fill in repository details:
   - **Repository name**: `sem3-interactive-website` (or your choice)
   - **Description**: "Interactive 3D website showcasing Semester 3 college subjects"
   - **Visibility**: Public (required for free GitHub Pages)
   - **Do NOT** initialize with README (we already have local files)
5. Click "Create repository"

### Step 2: Connect Local to Remote

GitHub will show you commands. Use these:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

---

## Part 3: Configure Vite for GitHub Pages

### Step 1: Update vite.config.js

Add the `base` property to your Vite config:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPO_NAME/',  // Add this line
})
```

**Important**: Replace `YOUR_REPO_NAME` with your actual repository name.

For example, if your repo is `sem3-interactive-website`:
```javascript
base: '/sem3-interactive-website/',
```

### Step 2: Install gh-pages Package

```bash
npm install --save-dev gh-pages
```

### Step 3: Add Deployment Scripts to package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

---

## Part 4: Deploy to GitHub Pages

### Method 1: Manual Deployment (Simple)

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

This will:
1. Build your project to the `dist` folder
2. Create a `gh-pages` branch
3. Push the built files to GitHub

### Method 2: Automated with GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Build
      run: npm run build

    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

This automatically deploys whenever you push to main branch.

---

## Part 5: Enable GitHub Pages

### Step 1: Configure GitHub Pages Settings

1. Go to your GitHub repository
2. Click "Settings" tab
3. Scroll to "Pages" in left sidebar
4. Under "Source":
   - Select branch: `gh-pages`
   - Select folder: `/ (root)`
5. Click "Save"

### Step 2: Wait for Deployment

- GitHub will build and deploy your site
- This takes 1-5 minutes
- You'll see a green checkmark when ready

### Step 3: Access Your Website

Your site will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

For example:
```
https://johnsmith.github.io/sem3-interactive-website/
```

---

## Part 6: Update & Redeploy

### Making Changes

1. Edit your code locally
2. Test with `npm run dev`
3. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
4. Deploy updates:
   ```bash
   npm run deploy
   ```

### Automatic Updates (with GitHub Actions)

If using GitHub Actions, just push to main:
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

It will auto-deploy!

---

## Troubleshooting

### Issue: Blank Page After Deployment

**Solution**: Check your `vite.config.js` has correct `base` path
```javascript
base: '/YOUR_REPO_NAME/',  // Must match repository name
```

### Issue: 404 on Routes

**Solution**: Add a `404.html` to your `public` folder that redirects to `index.html`

Or configure proper routing in your app.

### Issue: Assets Not Loading

**Solution**: Ensure all asset paths are relative, not absolute:
```javascript
// Good
<img src="./assets/logo.png" />

// Bad
<img src="/assets/logo.png" />
```

### Issue: Build Fails

**Solution**:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install`
3. Try building again: `npm run build`

### Check Build Locally

Before deploying, test the build:
```bash
npm run build
npm run preview
```

This shows how it will look on GitHub Pages.

---

## Custom Domain (Optional)

### If You Have a Custom Domain

1. In repository settings → Pages
2. Add your custom domain (e.g., `myproject.com`)
3. Create a `CNAME` file in `public/` folder:
   ```
   myproject.com
   ```
4. Configure DNS records with your domain provider

---

## Deployment Checklist

Before deploying:
- [ ] All features tested locally
- [ ] Build runs without errors
- [ ] Assets load correctly
- [ ] Responsive design works
- [ ] 3D scenes perform well
- [ ] Navigation functions properly
- [ ] README.md is complete
- [ ] .gitignore is configured
- [ ] vite.config.js has correct base path

After deployment:
- [ ] Site loads at GitHub Pages URL
- [ ] All pages navigate correctly
- [ ] 3D features work in production
- [ ] Images and assets load
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Share link with others

---

## Useful Commands Reference

```bash
# Development
npm run dev              # Start development server

# Building
npm run build            # Create production build
npm run preview          # Preview production build locally

# Deployment
npm run deploy           # Deploy to GitHub Pages

# Git
git status               # Check what's changed
git add .                # Stage all changes
git commit -m "message"  # Commit with message
git push origin main     # Push to GitHub
git pull origin main     # Pull latest changes

# Troubleshooting
npm install              # Install dependencies
npm run build            # Test build process
rm -rf node_modules      # Remove node_modules (if issues)
```

---

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)
- [GitHub Actions](https://docs.github.com/en/actions)

---

## Next Steps

After successful deployment:
1. Share your website URL
2. Add URL to GitHub repository description
3. Update your README with live demo link
4. Consider adding to your portfolio
5. Share on LinkedIn/social media

---

*Last Updated*: 2025-10-31
