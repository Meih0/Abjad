# 🚨 CRITICAL FIX - Amplify Rewrites

## THE PROBLEM

The rewrite rule `/<*>` is catching JavaScript/CSS files and returning HTML instead!

**Error you're seeing:**
```
Expected a JavaScript module but server responded with MIME type "text/html"
```

---

## THE FIX (2 minutes)

### Step 1: Open Amplify Console
The console should already be open, or run:
```bash
amplify console
```

### Step 2: Navigate to Rewrites
- Click on your app name
- In left sidebar: **App settings** → **Rewrites and redirects**

### Step 3: DELETE the Current Rule
- Find the rule with source `/<*>`
- Click the **trash/delete icon**
- Confirm deletion

### Step 4: Add TWO New Rules

**Rule 1 - Preserve Assets:**
- Source address: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>`
- Target address: `/index.html`
- Type: `200 (Rewrite)`

**OR if that doesn't work, use this simpler approach:**

**Rule 1 - Static files (Higher priority):**
- Source address: `/assets/<*>`
- Target address: `/assets/<*>`
- Type: `200 (Rewrite)`

**Rule 2 - Static files images:**
- Source address: `/images/<*>`
- Target address: `/images/<*>`
- Type: `200 (Rewrite)`

**Rule 3 - Everything else:**
- Source address: `/<*>`
- Target address: `/index.html`
- Type: `404-200 (Redirect)`

### Step 5: Save and Wait
- Click **Save**
- Wait 2 minutes for changes to propagate

---

## ALTERNATE SOLUTION - Use Amplify's Default

Actually, the BEST solution is to let Amplify's default work:

1. **DELETE ALL custom rewrite rules**
2. Amplify should auto-detect it's an SPA
3. The `_redirects` file I just updated should handle it

---

## I'M DEPLOYING THE FIX NOW

I updated the `_redirects` file to:
```
# Don't redirect assets
/assets/*  /assets/:splat  200
/images/*  /images/:splat  200

# Redirect everything else
/*    /index.html   200
```

This tells Amplify to NOT rewrite asset files!

Deploying now...
