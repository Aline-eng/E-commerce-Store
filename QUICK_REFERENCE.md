# Quick Reference Guide - ShopEasy Phase 1

## 🚀 Quick Start

```bash
# Backend
cd backend
npm install
# Add .env file with JWT_SECRET and JWT_REFRESH_SECRET
npm run dev

# Frontend (new terminal)
cd frontend
npm install
# Add .env file with REACT_APP_API_URL
npm start
```

## 🔑 Key Environment Variables

### Backend `.env`
```
JWT_SECRET=min_32_characters_secret_key
JWT_REFRESH_SECRET=min_32_characters_refresh_key
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📡 API Quick Reference

### Auth
```javascript
// Register
POST /api/auth/register
Body: { name, email, password }

// Login
POST /api/auth/login
Body: { email, password }
Returns: { user, accessToken, refreshToken }

// Get Profile (Protected)
GET /api/auth/profile
Headers: { Authorization: "Bearer <token>" }
```

### Reviews
```javascript
// Create Review (Protected)
POST /api/reviews/:productId
Headers: { Authorization: "Bearer <token>" }
Body: { rating: 1-5, comment: "text" }

// Get Reviews
GET /api/reviews/:productId
```

### Wishlist
```javascript
// Get Wishlist (Protected)
GET /api/wishlist
Headers: { Authorization: "Bearer <token>" }

// Add to Wishlist (Protected)
POST /api/wishlist
Body: { productId: "id" }

// Remove from Wishlist (Protected)
DELETE /api/wishlist/:productId
```

## 🎨 Frontend Usage

### Using Auth Context
```typescript
import { useAuth } from '../context/AuthContext';

const { user, login, logout, isAuthenticated } = useAuth();

// Login
await login(email, password);

// Check if authenticated
if (isAuthenticated) { /* ... */ }
```

### Using Theme Context
```typescript
import { useTheme } from '../context/ThemeContext';

const { isDark, toggleTheme } = useTheme();

<button onClick={toggleTheme}>
  {isDark ? '☀️' : '🌙'}
</button>
```

### Using Wishlist Hook
```typescript
import { useWishlist } from '../hooks/useWishlist';

const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

// Add to wishlist
await addToWishlist(productId);

// Check if in wishlist
if (isInWishlist(productId)) { /* ... */ }
```

### Using Toast Notifications
```typescript
import { useToast } from '../context/ToastContext';

const { showToast } = useToast();

showToast('Success message', 'success');
showToast('Error message', 'error');
```

## 🛡️ Protected Routes

```typescript
import ProtectedRoute from './components/ProtectedRoute';

<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } 
/>
```

## 🎯 Common Tasks

### Add New Protected Endpoint (Backend)
```javascript
// In routes file
const auth = require('../middleware/auth');
router.get('/protected', auth, controller.method);
```

### Add New Page (Frontend)
```typescript
// 1. Create page in src/pages/
// 2. Add route in App.tsx
<Route path="/new-page" element={<NewPage />} />
```

### Add Dark Mode to Component
```typescript
// Use dark: prefix for dark mode styles
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
```

## 🔧 Troubleshooting

### Token Expired
- Frontend automatically refreshes tokens
- If refresh fails, user is redirected to login

### CORS Issues
- Backend accepts all origins (update for production)
- Check REACT_APP_API_URL is correct

### Dark Mode Not Working
- Verify tailwind.config.js has `darkMode: 'class'`
- Check localStorage for 'theme' key

## 📦 Install New Dependencies

### Backend
```bash
cd backend
npm install package-name
```

### Frontend
```bash
cd frontend
npm install package-name
```

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Storybook
npm run storybook
```

## 🚀 Deploy

### Backend (Railway)
1. Push to GitHub
2. Railway auto-deploys
3. Add env vars in dashboard

### Frontend (Vercel)
1. Push to GitHub
2. Vercel auto-deploys
3. Add REACT_APP_API_URL in settings

## 📊 Project Stats

- **Backend Files**: 15 new, 5 updated
- **Frontend Files**: 18 new, 5 updated
- **API Endpoints**: 14 new
- **Components**: 15+ React components
- **Lines of Code**: 3000+

## 🎉 Features at a Glance

✅ JWT Authentication
✅ User Registration/Login
✅ Password Reset
✅ Product Reviews
✅ Wishlist
✅ Dark Mode
✅ Toast Notifications
✅ Protected Routes
✅ Rate Limiting
✅ Input Validation
✅ Responsive Design
✅ Loading States
✅ Error Handling

## 📞 Need Help?

1. Check PHASE1_DOCUMENTATION.md
2. Check INSTALLATION.md
3. Review API responses in browser console
4. Verify environment variables

---

**Quick Reference for ShopEasy Phase 1** 🚀
