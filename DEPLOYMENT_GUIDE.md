# GitHub Pages Deployment Guide

## 📦 Prerequisites

Before deploying to GitHub Pages, ensure you have:
- A GitHub account
- Git installed on your machine
- Your project pushed to a GitHub repository
- Node.js and npm installed (for build process)

---

## 🚀 Deployment Steps

### Step 1: Set Up Your Project Configuration

#### Option A: If you have a `package.json` file

1. **Install gh-pages package:**
```bash
npm install --save-dev gh-pages
```

2. **Add homepage to package.json:**
```json
{
  "homepage": "https://your-username.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Replace:**
- `your-username` with your GitHub username
- `your-repo-name` with your repository name

#### Option B: If you DON'T have a build setup yet

You need to set up a React build configuration first. Here's a minimal setup:

**1. Create `package.json`:**
```json
{
  "name": "home-twin",
  "version": "1.0.0",
  "homepage": "https://your-username.github.io/Abjad",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@tanstack/react-query": "^5.0.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "latest",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^5.4.11",
    "gh-pages": "^6.1.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17"
  }
}
```

**2. Create `vite.config.js`:**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/Abjad/', // Replace with your repo name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
```

**3. Create `index.html` in root directory:**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home Twin - Smart Home Management</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**4. Create entry point `src/main.jsx`:**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**5. Create `src/App.jsx`:**
```javascript
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import ErrorBoundary from './Components/ErrorBoundary';
import { useToast } from './hooks/useToast';
import ToastContainer from './Components/ToastContainer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { toasts, removeToast } = useToast();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/Abjad">
          <Layout />
          <ToastContainer toasts={toasts} onRemove={removeToast} />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
```

**6. Install dependencies:**
```bash
npm install
```

---

### Step 2: Configure GitHub Repository

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main
```

2. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Click on **Settings**
   - Scroll to **Pages** section (left sidebar)
   - Under **Source**, select **Deploy from a branch**
   - Under **Branch**, select `gh-pages` and `/ (root)`
   - Click **Save**

---

### Step 3: Deploy Your Application

Run the deployment command:

```bash
npm run deploy
```

This will:
1. Build your application (`npm run build`)
2. Create/update the `gh-pages` branch
3. Push the built files to GitHub Pages

---

### Step 4: Access Your Deployed Site

Your site will be available at:
```
https://your-username.github.io/Abjad/
```

**Note:** It may take 2-5 minutes for the site to be live after deployment.

---

## 🔧 Troubleshooting

### Issue 1: Blank Page After Deployment

**Cause:** Incorrect `base` path in vite.config.js

**Solution:**
```javascript
// vite.config.js
export default defineConfig({
  base: '/Abjad/', // Must match your repo name with trailing slash
});
```

### Issue 2: 404 Errors for Routes

**Cause:** GitHub Pages doesn't support client-side routing by default

**Solution:** Create `public/404.html`:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Home Twin</title>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/Abjad'">
  </head>
</html>
```

And update your `index.html`:
```html
<script>
  (function() {
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

### Issue 3: Images/Assets Not Loading

**Cause:** Incorrect asset paths

**Solution:** Use relative paths or the `base` path:
```javascript
// Instead of:
<img src="/images/logo.png" />

// Use:
<img src={`${import.meta.env.BASE_URL}images/logo.png`} />
```

### Issue 4: API Calls Failing (CORS Issues)

**Cause:** Your Base44 API might not be configured for CORS

**Solution:**
1. Check your Base44 API CORS settings
2. Ensure your deployed domain is whitelisted
3. Consider using environment variables for API endpoints:

```javascript
// Create .env.production
VITE_API_URL=https://your-api-domain.com

// Use in code:
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

---

## 🔄 Updating Your Deployment

Whenever you make changes:

```bash
# 1. Commit your changes
git add .
git commit -m "Your commit message"
git push origin main

# 2. Deploy to GitHub Pages
npm run deploy
```

---

## 🎯 Best Practices

### 1. Use Environment Variables

Create `.env.production`:
```env
VITE_API_URL=https://api.yourbackend.com
VITE_APP_NAME=Home Twin
```

### 2. Optimize Build Size

Add to `vite.config.js`:
```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'query-vendor': ['@tanstack/react-query'],
        'ui-vendor': ['framer-motion', 'lucide-react'],
      },
    },
  },
  chunkSizeWarningLimit: 1000,
},
```

### 3. Add Build Status Badge

Add to your README.md:
```markdown
![Deploy Status](https://github.com/your-username/Abjad/actions/workflows/deploy.yml/badge.svg)
```

### 4. Set Up Automated Deployment (GitHub Actions)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

This will automatically deploy whenever you push to the `main` branch.

---

## 📋 Pre-Deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] Build successful (`npm run build`)
- [ ] Preview works locally (`npm run preview`)
- [ ] `homepage` in package.json matches GitHub repo
- [ ] `base` in vite.config.js matches repo name
- [ ] Environment variables configured
- [ ] API endpoints updated for production
- [ ] Error boundary implemented
- [ ] Loading states added
- [ ] 404 page created
- [ ] Code committed and pushed to GitHub
- [ ] GitHub Pages enabled in repository settings

---

## 🌐 Alternative: Deploy to Vercel (Recommended for Production)

GitHub Pages has limitations. For a production app, consider Vercel:

### Vercel Deployment (Easier & Better)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Follow prompts:**
   - Link to your GitHub repo
   - Configure build settings (auto-detected)
   - Deploy!

**Benefits:**
- Automatic HTTPS
- Custom domains
- Better performance
- Serverless functions support
- Automatic deployments on git push
- No routing issues

---

## 📞 Need Help?

Common commands:
```bash
# Test build locally
npm run build && npm run preview

# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build

# Check for errors
npm run build -- --debug
```

---

**Last Updated:** 2026-01-08
**Version:** 1.0.0
