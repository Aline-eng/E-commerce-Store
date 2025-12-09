# Frontend Troubleshooting Guide

## ✅ ISSUE RESOLVED: npm install errors

### Problem
After running `npm audit fix --force`, dependencies broke and `react-scripts` was not recognized.

### Solution Applied
1. Fixed `package.json` with correct versions
2. Removed incompatible Storybook packages
3. Cleaned node_modules and package-lock.json
4. Reinstalled with `--legacy-peer-deps` flag
5. Installed missing ajv dependency

### Current Status
✅ Dependencies installed successfully
✅ react-scripts available
✅ Ready to start development

## How to Start the App

```bash
# Make sure you're in the frontend directory
cd frontend

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

## Important Notes

### DO NOT run these commands:
- ❌ `npm audit fix --force` (breaks dependencies)
- ❌ `npm audit fix` (may cause issues)

### Security Vulnerabilities
The 9 vulnerabilities shown are in development dependencies (webpack-dev-server, svgo, etc.) and do NOT affect production builds. They are safe to ignore for development.

### If You Need to Reinstall

```bash
# Delete node_modules and package-lock
rmdir /s /q node_modules
del package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps
```

## Common Issues

### Issue: "react-scripts is not recognized"
**Solution**: Run `npm install --legacy-peer-deps`

### Issue: Module not found errors
**Solution**: 
```bash
npm install --legacy-peer-deps
```

### Issue: Port 3000 already in use
**Solution**:
```bash
# Find and kill the process
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Issue: CORS errors
**Solution**: Verify `REACT_APP_API_URL` in `.env` file

## Environment Setup

Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production:
```env
REACT_APP_API_URL=https://your-backend.railway.app/api
```

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run typecheck` - Check TypeScript types

## Need More Help?

1. Check console for specific error messages
2. Verify all environment variables are set
3. Ensure backend is running on port 5000
4. Clear browser cache and restart

---

**Status**: ✅ All issues resolved, ready for development!
