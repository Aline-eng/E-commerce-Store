# ShopEasy - Full-Stack E-Commerce Platform

A modern, feature-rich e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript.

## 🚀 Features

### ✅ Phase 1 Complete
- **User Authentication**
  - JWT-based auth with refresh tokens
  - Register, login, logout
  - Password reset flow
  - Protected routes
  - User profile management

- **Product Features**
  - Product catalog with search & filters
  - Detailed product pages with image gallery
  - Customer reviews and ratings
  - Wishlist functionality
  - Lazy loading images

- **Shopping Experience**
  - Shopping cart with quantity management
  - Checkout process
  - Order history
  - Order tracking

- **Modern UI/UX**
  - Dark mode support
  - Toast notifications
  - Loading skeletons
  - Responsive design
  - Accessibility features

- **Security**
  - Input validation (Joi)
  - Rate limiting
  - XSS protection
  - MongoDB injection protection
  - Secure password hashing

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- React Router v6
- Tailwind CSS
- Axios
- Context API for state management
- Storybook for component development

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing
- Joi for validation
- Helmet for security
- Express Rate Limit

### Deployment
- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas

## 📦 Installation

See [INSTALLATION.md](./INSTALLATION.md) for detailed setup instructions.

### Quick Start
```bash
# Clone repository
git clone <repository-url>

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Configure environment variables (see INSTALLATION.md)

# Start backend
cd backend
npm run dev

# Start frontend (new terminal)
cd frontend
npm start
```

## 📚 Documentation

- [Phase 1 Documentation](./PHASE1_DOCUMENTATION.md) - Complete feature documentation
- [Installation Guide](./INSTALLATION.md) - Setup instructions
- [API Documentation](./PHASE1_DOCUMENTATION.md#-api-endpoints) - API endpoints reference

## 🎯 Project Structure

```
E-commerce-Store/
├── backend/
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth, validation, rate limiting
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── data/            # Seed data
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Context providers
│   │   ├── hooks/       # Custom hooks
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── types/       # TypeScript types
│   └── public/
└── docs/
```

## 🔐 Environment Variables

### Backend
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
NODE_ENV=production
```

### Frontend
```env
REACT_APP_API_URL=your_backend_api_url
```

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run Storybook
npm run storybook
```

## 🚀 Deployment

### Backend (Railway)
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically on push

### Frontend (Vercel)
1. Import project from GitHub
2. Add environment variables
3. Deploy automatically on push

## 📱 Screenshots

### Light Mode
- Modern product catalog
- Detailed product pages
- Shopping cart
- User profile

### Dark Mode
- Full dark mode support
- Smooth theme transitions
- Consistent design

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Gradient buttons, smooth animations
- **Accessibility**: ARIA labels, keyboard navigation
- **Performance**: Lazy loading, code splitting
- **UX**: Toast notifications, loading states

## 🔄 Roadmap

### Phase 2 (Planned)
- Payment integration (Stripe)
- Admin dashboard
- Advanced search & filters
- Product recommendations
- Email notifications

### Phase 3 (Planned)
- Social authentication
- Multi-vendor support
- Advanced analytics
- Inventory management
- Shipping integration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for learning and demonstration purposes.

## 🙏 Acknowledgments

- Unsplash for product images
- Tailwind CSS for styling
- MongoDB Atlas for database hosting
- Railway & Vercel for deployment

---

**Status**: Phase 1 Complete ✅

For detailed feature documentation, see [PHASE1_DOCUMENTATION.md](./PHASE1_DOCUMENTATION.md)
