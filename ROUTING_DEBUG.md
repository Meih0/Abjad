# Routing Debug Guide

## If Direct URLs Still Don't Work

### Test These URLs (wait 2-3 minutes after deploy):

1. **Root (should work):**
   - https://dev.dd0bvgnjd070i.amplifyapp.com/

2. **Login (test this):**
   - https://dev.dd0bvgnjd070i.amplifyapp.com/login

3. **Home (should redirect to login if not authenticated):**
   - https://dev.dd0bvgnjd070i.amplifyapp.com/home

---

## If Still Broken - Alternative Fix

The Amplify Console rewrites might need different format. Try this instead:

### Option 1: Update the Rewrite Rule

In Amplify Console, EDIT the existing rule to:

**Source address pattern:**
```
</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>
```

**Target address:**
```
/index.html
```

**Type:** 200 (Rewrite)

### Option 2: Simpler Pattern

Or try this simpler one:

**Source address pattern:**
```
</^((?!\..*$).)*$/>
```

**Target address:**
```
/index.html
```

**Type:** 200 (Rewrite)

### Option 3: Catch-All Pattern

**Source address pattern:**
```
/<*>
```

**Target address:**
```
/index.html
```

**Type:** 404-200 (Redirect)

---

## Check What You Currently Have

1. Go to Amplify Console
2. App Settings → Rewrites and redirects
3. You should see ONE rule
4. Screenshot it and let me know what you see

---

## Nuclear Option - Delete and Re-add

If nothing works:

1. **Delete** the existing rewrite rule
2. Wait 1 minute
3. **Add new rule** with EXACTLY:
   - Source: `/<*>`
   - Target: `/index.html`
   - Type: `200 (Rewrite)`
4. Save
5. Wait 2 minutes
6. Test again

---

## Verify _redirects File is Deployed

Check if the file made it to production:

Visit: https://dev.dd0bvgnjd070i.amplifyapp.com/_redirects

If you see the file content, it's deployed. If 404, the file didn't make it.

---

## Current Expected Behavior

**Landing page:** ✅ Works (always)
**Direct /login:** ⚠️ Testing after deploy
**Direct /home:** ⚠️ Should redirect to / if not logged in
**Direct /tasks:** ⚠️ Should redirect to / if not logged in

---

## What "Not Working" Means

Tell me EXACTLY what happens:
1. **404 error?** → Rewrite rule not configured correctly
2. **Blank page?** → JavaScript error, check browser console (F12)
3. **Redirects to /?** → That's actually CORRECT behavior if you're not logged in
4. **Shows landing instead of login page?** → Route configuration issue

---

## Quick Test

Open browser console (F12) and try:
```
https://dev.dd0bvgnjd070i.amplifyapp.com/login
```

Look for:
- Network tab: Did it load index.html? (Good)
- Console tab: Any errors? (Tell me what they are)
- Elements tab: Is React loaded? (Should see root element)

---

Let me know EXACTLY what you see and I'll fix it immediately!
