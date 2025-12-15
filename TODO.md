# E-commerce Store Fixes - Implementation Plan

## Backend Changes
- [x] Add PATCH route for cancelling orders in backend/routes/orders.js (with validation)
- [x] Add admin routes for users (GET all, PUT update, DELETE) in backend/routes/users.js
- [x] Add PUT/DELETE routes to products for full CRUD
- [ ] Update backend/data/seed.js with sample reviews and more products across categories

## Frontend Changes
- [ ] Update frontend/src/components/Orders.tsx to call API for order cancellation
- [ ] Fix frontend/src/components/Cart.tsx checkout to send proper customer data and item prices
- [ ] Add related products section in frontend/src/pages/ProductDetail.tsx
- [x] Add admin API functions to frontend/src/services/api.ts
- [ ] Redesign frontend/src/pages/AdminDashboard.tsx with professional admin interface

## Testing
- [ ] Test order cancellation persists after page reload
- [ ] Test checkout with proper validation
- [ ] Test product reviews display
- [ ] Test related products functionality
- [ ] Test admin dashboard functionality and authorization
