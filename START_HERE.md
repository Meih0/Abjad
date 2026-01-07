# ▶️ START HERE - Deploy Your App in 5 Minutes

## ⚠️ IMPORTANT: Before You Start

**Edit `package.json` line 4:**

Replace `YOUR-USERNAME` with your actual GitHub username:

```json
"homepage": "https://YOUR-ACTUAL-GITHUB-USERNAME.github.io/Abjad"
```

For example, if your username is `johndoe`:
```json
"homepage": "https://johndoe.github.io/Abjad"
```

---

## 🚀 Deployment Steps (Copy & Paste)

Open your terminal in this folder and run these commands:

### 1️⃣ Install Dependencies

```bash
npm install
```

Wait for installation to complete (2-3 minutes).

### 2️⃣ Test Locally (Optional but Recommended)

```bash
npm run build
npm run preview
```

Open http://localhost:4173 in your browser. Press `Ctrl+C` to stop when done.

### 3️⃣ Commit and Push to GitHub

```bash
git add .
git commit -m "Setup for deployment"
git push origin main
```

### 4️⃣ Deploy to GitHub Pages

```bash
npm run deploy
```

Wait 2-3 minutes for deployment to complete.

### 5️⃣ Enable GitHub Pages

1. Go to: https://github.com/YOUR-USERNAME/Abjad/settings/pages
2. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click **Save**

### 6️⃣ View Your Live Site

Wait 2-5 minutes, then visit:
```
https://YOUR-USERNAME.github.io/Abjad/
```

---

## ✅ That's It!

Your app is now live! 🎉

### 📝 To Update Your Site Later:

```bash
# Make your changes, then:
git add .
git commit -m "Describe your changes"
git push origin main
npm run deploy
```

---

## ❌ Troubleshooting

### "Command not found: npm"
Install Node.js from https://nodejs.org/

### "Permission denied"
Run: `npm cache clean --force` then retry

### "Deploy failed"
1. Check you edited `YOUR-USERNAME` in package.json
2. Run: `rm -rf node_modules && npm install`
3. Try deploy again: `npm run deploy`

### Site shows blank page
1. Check browser console (F12) for errors
2. Verify `vite.config.js` has `base: '/Abjad/'`
3. Wait 5 minutes and refresh

---

## 🆘 Need More Help?

- Read [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for quick reference
- Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed guide
- Check GitHub Actions tab for deployment status

---

**Remember:** Replace `YOUR-USERNAME` in package.json before deploying! 🔴
