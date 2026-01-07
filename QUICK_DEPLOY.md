# 🚀 Quick Deploy to GitHub Pages

## ⚡ One-Time Setup (5 minutes)

### Step 1: Update Configuration

**IMPORTANT:** Edit `package.json` and replace `YOUR-USERNAME` with your actual GitHub username:
```json
"homepage": "https://YOUR-USERNAME.github.io/Abjad"
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Test Build Locally

```bash
npm run build
npm run preview
```

Visit http://localhost:4173 to verify everything works.

---

## 🌐 Deploy to GitHub Pages

### First Time Deployment

```bash
# 1. Make sure you're on the main branch
git checkout main

# 2. Commit all changes
git add .
git commit -m "Setup for GitHub Pages deployment"
git push origin main

# 3. Deploy
npm run deploy
```

### Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **Source**, select branch: `gh-pages`, folder: `/ (root)`
4. Click **Save**

Wait 2-5 minutes, then visit:
```
https://YOUR-USERNAME.github.io/Abjad/
```

---

## 🔄 Future Updates

After making changes:

```bash
git add .
git commit -m "Your update message"
git push origin main
npm run deploy
```

---

## ❌ If Deployment Fails

### Issue: Module not found errors
```bash
npm install
npm run deploy
```

### Issue: Git errors
```bash
rm -rf node_modules/.cache
npm run deploy
```

### Issue: Blank page after deployment
1. Check `vite.config.js` - `base` should be `/Abjad/`
2. Check `package.json` - `homepage` should match your repo
3. Check browser console for errors

---

## 📋 Checklist

Before deploying:
- [ ] Updated `YOUR-USERNAME` in package.json
- [ ] Ran `npm install`
- [ ] Tested locally with `npm run build && npm run preview`
- [ ] All changes committed to git
- [ ] GitHub Pages enabled in repo settings

---

## 🎯 Quick Commands

```bash
# Development
npm run dev              # Start dev server

# Build & Preview
npm run build            # Build for production
npm run preview          # Preview production build

# Deploy
npm run deploy           # Deploy to GitHub Pages

# Clean & Rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

**That's it!** Your app will be live at `https://YOUR-USERNAME.github.io/Abjad/` 🎉
