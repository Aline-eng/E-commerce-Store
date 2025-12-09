# Installation & Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create `.env` file in backend directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_REFRESH_SECRET=your_super_secret_refresh_key_minimum_32_characters_long
```

### 3. Seed Database (Optional)
```bash
node data/seed.js
```

### 4. Start Backend Server
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables
Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Frontend
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Testing

### Run Frontend Tests
```bash
cd frontend
npm test
```

### Run Storybook
```bash
cd frontend
npm run storybook
```

## Production Deployment

### Backend (Railway)
1. Push code to GitHub
2. Connect Railway to your repository
3. Add environment variables in Railway dashboard
4. Deploy automatically

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable: `REACT_APP_API_URL`
4. Deploy

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables are set
- Check port 5000 is not in use

### Frontend can't connect to backend
- Verify REACT_APP_API_URL is correct
- Check CORS settings in backend
- Ensure backend is running

### Dark mode not working
- Clear browser cache
- Check localStorage for 'theme' key
- Verify Tailwind config has darkMode: 'class'

## Quick Start Commands

```bash
# Install all dependencies
npm install

# Start backend
cd backend && npm run dev

# Start frontend (new terminal)
cd frontend && npm start

# Run tests
cd frontend && npm test
```

## Default Test User
After seeding, you can register a new user or use the registration page.

## Support
Check PHASE1_DOCUMENTATION.md for detailed API documentation and features.
