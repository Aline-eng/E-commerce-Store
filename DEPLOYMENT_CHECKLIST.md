# 🚀 Deployment Checklist - Phase 1

## Pre-Deployment

### Backend Preparation
- [ ] All dependencies installed (`npm install`)
- [ ] Environment variables configured
  - [ ] JWT_SECRET (min 32 characters)
  - [ ] JWT_REFRESH_SECRET (min 32 characters)
  - [ ] MONGODB_URI
  - [ ] NODE_ENV=production
- [ ] Database seeded (optional: `node data/seed.js`)
- [ ] Server starts without errors (`npm run dev`)
- [ ] All API endpoints tested

### Frontend Preparation
- [ ] All dependencies installed (`npm install`)
- [ ] Environment variables configured
  - [ ] REACT_APP_API_URL (backend URL)
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] Tests pass (`npm test`)
- [ ] App runs locally (`npm start`)

## Backend Deployment (Railway)

### Step 1: Prepare Repository
- [ ] Code pushed to GitHub
- [ ] `.env` file in `.gitignore`
- [ ] `railway.toml` configured (if exists)

### Step 2: Railway Setup
- [ ] Railway account created
- [ ] New project created
- [ ] GitHub repository connected
- [ ] Branch selected (main/master)

### Step 3: Environment Variables
Add in Railway dashboard:
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] JWT_REFRESH_SECRET
- [ ] NODE_ENV=production
- [ ] PORT (Railway auto-assigns)

### Step 4: Deploy
- [ ] Trigger deployment
- [ ] Check deployment logs
- [ ] Verify no errors
- [ ] Test health endpoint: `https://your-app.railway.app/api/health`

### Step 5: Verify Backend
- [ ] Health check returns 200
- [ ] Products endpoint works: `/api/products`
- [ ] Auth endpoints accessible
- [ ] CORS configured correctly

## Frontend Deployment (Vercel)

### Step 1: Prepare Repository
- [ ] Code pushed to GitHub
- [ ] `.env` files in `.gitignore`
- [ ] Build folder in `.gitignore`

### Step 2: Vercel Setup
- [ ] Vercel account created
- [ ] Import project from GitHub
- [ ] Framework preset: Create React App
- [ ] Root directory: `frontend`

### Step 3: Environment Variables
Add in Vercel dashboard:
- [ ] REACT_APP_API_URL=https://your-backend.railway.app/api

### Step 4: Deploy
- [ ] Trigger deployment
- [ ] Check build logs
- [ ] Verify no errors
- [ ] Visit deployed URL

### Step 5: Verify Frontend
- [ ] Homepage loads
- [ ] Products display
- [ ] Dark mode works
- [ ] Login/Register work
- [ ] API calls succeed
- [ ] No console errors

## Post-Deployment Testing

### Authentication Flow
- [ ] Register new user
- [ ] Login with credentials
- [ ] Access token received
- [ ] Protected routes accessible
- [ ] Logout works
- [ ] Token refresh works

### Product Features
- [ ] Products load on homepage
- [ ] Product detail page works
- [ ] Add to cart works
- [ ] Reviews can be created (when logged in)
- [ ] Wishlist add/remove works (when logged in)

### UI/UX
- [ ] Dark mode toggle works
- [ ] Toast notifications appear
- [ ] Loading states show
- [ ] Mobile responsive
- [ ] Navigation works
- [ ] Images load (lazy loading)

### Security
- [ ] Protected routes redirect to login
- [ ] Invalid tokens rejected
- [ ] Rate limiting active
- [ ] HTTPS enabled
- [ ] Security headers present

## Database (MongoDB Atlas)

### Verify
- [ ] Connection string correct
- [ ] IP whitelist configured (0.0.0.0/0 for Railway)
- [ ] Database user has correct permissions
- [ ] Collections created
- [ ] Indexes created (if any)

## Performance Checks

### Backend
- [ ] Response times < 500ms
- [ ] No memory leaks
- [ ] Error handling works
- [ ] Logs are clean

### Frontend
- [ ] Page load < 3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] Lighthouse score > 80

## Security Checklist

### Backend
- [ ] JWT secrets are strong (32+ chars)
- [ ] Passwords hashed with bcrypt
- [ ] Rate limiting active
- [ ] Helmet middleware active
- [ ] MongoDB sanitization active
- [ ] CORS configured properly
- [ ] No sensitive data in logs

### Frontend
- [ ] No API keys in code
- [ ] Environment variables used
- [ ] HTTPS enforced
- [ ] XSS protection
- [ ] No console.log in production

## Monitoring Setup

### Backend
- [ ] Railway logs accessible
- [ ] Error tracking configured (optional)
- [ ] Uptime monitoring (optional)

### Frontend
- [ ] Vercel analytics enabled
- [ ] Error boundary implemented
- [ ] Performance monitoring (optional)

## Documentation

- [ ] README.md updated
- [ ] API documentation complete
- [ ] Environment variables documented
- [ ] Deployment guide available

## Final Verification

### Test User Journey
1. [ ] Visit homepage
2. [ ] Browse products
3. [ ] View product detail
4. [ ] Register account
5. [ ] Login
6. [ ] Add product to wishlist
7. [ ] Write review
8. [ ] Add to cart
9. [ ] View profile
10. [ ] Logout

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

## Rollback Plan

### If Deployment Fails

#### Backend
1. Check Railway logs
2. Verify environment variables
3. Test database connection
4. Rollback to previous deployment
5. Fix issues locally
6. Redeploy

#### Frontend
1. Check Vercel build logs
2. Verify environment variables
3. Test build locally
4. Rollback to previous deployment
5. Fix issues locally
6. Redeploy

## Post-Deployment Tasks

- [ ] Update README with live URLs
- [ ] Share deployment links
- [ ] Monitor for 24 hours
- [ ] Collect user feedback
- [ ] Plan Phase 2 features

## URLs to Save

```
Backend (Railway): https://your-backend.railway.app
Frontend (Vercel): https://your-frontend.vercel.app
MongoDB Atlas: https://cloud.mongodb.com
GitHub Repo: https://github.com/your-username/repo
```

## Support Contacts

- Railway Support: https://railway.app/help
- Vercel Support: https://vercel.com/support
- MongoDB Support: https://www.mongodb.com/support

---

## ✅ Deployment Complete!

Once all items are checked:
- [ ] Backend deployed and verified
- [ ] Frontend deployed and verified
- [ ] All features working
- [ ] Documentation updated
- [ ] Team notified

**Phase 1 is LIVE!** 🎉
