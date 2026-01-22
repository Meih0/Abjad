# 🚀 Deploy Your Abjad App Live

## Two Ways to Deploy

### **Option A: AWS Amplify Hosting (Recommended) - Best for Production**

#### Why AWS Amplify?
- ✅ Integrated with your backend (same platform)
- ✅ Automatic HTTPS + CDN
- ✅ Auto-deploy on git push
- ✅ Custom domain support
- ✅ ~$15/month for unlimited traffic

#### Steps:

**1. Add hosting to your Amplify project:**
```bash
cd c:\Developer\Abjad\Abjad

amplify add hosting
```

**When prompted, choose:**
```
? Select the plugin module to execute: Hosting with Amplify Console
? Choose a type: Manual deployment
```

**2. Build and publish:**
```bash
amplify publish
```

This will:
- Build your React app (`npm run build`)
- Upload to AWS
- Give you a live URL like: `https://dev.d1234abcd.amplifyapp.com`

**3. Done!** Your site is live! 🎉

**Time:** 5-10 minutes (first deploy)
**Cost:** ~$0.01 per build (first build free each month)

---

### **Option B: GitHub Pages (Free, but needs CORS fix)**

#### Why GitHub Pages?
- ✅ Completely free
- ✅ You already have it set up
- ✅ Good for testing/demos

#### ⚠️ Problem:
Your AWS API might block requests from GitHub Pages due to CORS (Cross-Origin). You'll need to configure this.

#### Steps:

**1. Update vite.config.js for production:**

Current config works for local dev. For GitHub Pages, make sure `base` is correct:

```javascript
// vite.config.js - Already correct!
export default defineConfig({
  plugins: [react()],
  base: '/Abjad/',  // ✅ This is correct for GitHub Pages
})
```

**2. Deploy:**
```bash
npm run deploy
```

**3. Configure AWS API for CORS:**

You need to tell AWS to allow requests from your GitHub Pages URL.

Create this file:

```javascript
// amplify/backend/api/abjad/custom-cors.json
{
  "cors": {
    "allowedOrigins": [
      "https://meih0.github.io",
      "http://localhost:5173",
      "http://localhost:3000"
    ],
    "allowedMethods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS"
    ],
    "allowedHeaders": [
      "Content-Type",
      "Authorization",
      "X-Api-Key"
    ]
  }
}
```

Then update:
```bash
amplify push
```

**4. Visit your site:**
```
https://meih0.github.io/Abjad/
```

**Time:** 2 minutes
**Cost:** Free

---

## 🎯 Recommended Approach

### **For Development/Testing:**
Use **GitHub Pages** (free, quick)

### **For Production/Real Users:**
Use **AWS Amplify Hosting** (professional, integrated)

---

## 🚀 Quick Deploy Guide - AWS Amplify (RECOMMENDED)

### **Step 1: Add Hosting**
```bash
cd c:\Developer\Abjad\Abjad

amplify add hosting
# Choose: Hosting with Amplify Console
# Choose: Manual deployment
```

### **Step 2: Update Base URL**

Since you're moving from GitHub Pages to Amplify, update `vite.config.js`:

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Change from '/Abjad/' to '/' for Amplify
})
```

And update `App.jsx`:

```javascript
// src/App.jsx
function App() {
  return (
    <Router basename="/">  {/* Change from "/Abjad" to "/" */}
      <AppContent />
    </Router>
  );
}
```

### **Step 3: Publish**
```bash
amplify publish
```

Wait 5-10 minutes...

### **Step 4: Get Your URL**

Amplify will show:
```
✔ Deployment complete!
https://dev.d1a2b3c4d5e6.amplifyapp.com
```

**🎉 Your site is LIVE!**

---

## 🌍 Add Custom Domain (Optional)

Want your own domain like `abjad.app` or `myapp.com`?

### **Step 1: Buy a domain**
- Namecheap: ~$10/year
- GoDaddy: ~$12/year
- AWS Route 53: ~$12/year

### **Step 2: Add to Amplify**

```bash
# In Amplify Console
amplify console
```

1. Click "Domain management" in left sidebar
2. Click "Add domain"
3. Enter your domain (e.g., `abjad.app`)
4. Follow DNS setup instructions
5. Wait 15-60 minutes for DNS propagation

### **Step 3: Done!**

Your app will be live at:
```
https://abjad.app
https://www.abjad.app
```

With automatic HTTPS certificate! 🔒

---

## 🔧 Troubleshooting

### **Issue: "Build failed"**

**Solution:** Check your build locally first:
```bash
npm run build
```

Fix any errors, then try `amplify publish` again.

### **Issue: "API calls failing in production"**

**Solution:** Check CORS settings. Your API needs to allow requests from your domain.

### **Issue: "404 on page refresh"**

**Solution:** Amplify automatically handles this, but for GitHub Pages, add a `404.html` that redirects to `index.html`.

### **Issue: "Images not loading"**

**Solution:** Check image paths. Use `/Abjad/images/...` for GitHub Pages, or `/images/...` for Amplify.

---

## 📊 Deployment Comparison

| Feature | GitHub Pages | AWS Amplify |
|---------|-------------|-------------|
| **Cost** | Free | ~$15/month |
| **Setup Time** | 2 mins | 15 mins |
| **Custom Domain** | Yes (manual DNS) | Yes (automatic SSL) |
| **Auto-Deploy** | Via GitHub Actions | Built-in |
| **CDN** | GitHub CDN | CloudFront CDN |
| **Backend Integration** | Separate | Integrated |
| **HTTPS** | Yes | Yes (auto-cert) |
| **Best For** | Demos/Testing | Production |

---

## ✅ Recommended Workflow

### **Phase 1: Development**
```bash
npm run dev  # Test locally
```

### **Phase 2: Testing**
```bash
npm run deploy  # Deploy to GitHub Pages
# Share with beta testers
```

### **Phase 3: Production**
```bash
amplify publish  # Deploy to AWS Amplify
# Launch to real users
```

---

## 🎉 Quick Command Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Deploy to AWS Amplify
amplify publish

# Open Amplify Console
amplify console
```

---

## 🚀 Deploy Right Now!

**Fastest way to see it live (2 minutes):**

```bash
npm run deploy
```

Visit: `https://meih0.github.io/Abjad/`

**Best way for production (15 minutes):**

```bash
amplify add hosting
amplify publish
```

Visit: `https://dev.d[random].amplifyapp.com`

---

## 🎯 What I Recommend

Since you're already using AWS for backend:

1. **Now:** Use GitHub Pages for testing (`npm run deploy`)
2. **Soon:** Move to Amplify Hosting for production (`amplify publish`)
3. **Later:** Add custom domain (e.g., `abjad.app`)

This gives you:
- ✅ Free testing environment (GitHub Pages)
- ✅ Professional production environment (Amplify)
- ✅ Easy updates (just `git push` with auto-deploy)

---

**Ready to go live? Run this now:**

```bash
npm run deploy
```

Then visit: `https://meih0.github.io/Abjad/`

🎉 Your app will be LIVE on the internet!
