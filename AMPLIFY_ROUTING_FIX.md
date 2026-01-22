# 🔧 Fix Amplify Routing - CRITICAL

## Problem
Direct URLs like `/home`, `/tasks`, etc. don't work - only root `/` works.

## Solution
You need to add rewrites in the Amplify Console manually.

---

## Steps to Fix (5 minutes)

### 1. Open Amplify Console
```bash
amplify console
```
Or visit: https://console.aws.amazon.com/amplify/

### 2. Navigate to Your App
- Find "abjad" in the list
- Click on it

### 3. Go to Rewrites and Redirects
- In the left sidebar, click "Rewrites and redirects"
- Or look for "App settings" → "Rewrites and redirects"

### 4. Add This Rule
Click "Add rule" or "Edit" and add:

**Source address:**
```
</>
```

**Target address:**
```
/index.html
```

**Type:** 200 (Rewrite)

**Condition:** (leave empty or use pattern match)

### 5. Alternative Method (via JSON)
If there's an option to edit as JSON, paste this:

```json
[
  {
    "source": "/<*>",
    "target": "/index.html",
    "status": "200",
    "condition": null
  }
]
```

### 6. Save
Click "Save" and wait 1-2 minutes for changes to propagate.

---

## Test After Fixing

Try these URLs directly:
- https://dev.dd0bvgnjd070i.amplifyapp.com/login
- https://dev.dd0bvgnjd070i.amplifyapp.com/signup
- https://dev.dd0bvgnjd070i.amplifyapp.com/home
- https://dev.dd0bvgnjd070i.amplifyapp.com/tasks

All should work! ✅

---

## Why This is Needed

React Router handles routing on the client side. When you visit `/home` directly:
1. Browser asks Amplify server for `/home`
2. Server doesn't have a file called `home`
3. Returns 404

With the rewrite rule:
1. Browser asks for `/home`
2. Server rewrites to `/index.html` (200 status, not redirect)
3. React app loads and router shows the `/home` page

---

## Quick Verification

After adding the rule, open browser dev tools (F12) and check:
- Network tab should show `index.html` loaded
- URL should stay as `/home` (not redirect to `/`)
- Page should display content

---

This is a one-time setup. Once done, all future deploys will work correctly!
