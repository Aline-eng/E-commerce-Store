# Testing Credentials

## Admin Account
- **Email**: admin@shop.co
- **Password**: admin123
- **Access**: Full admin dashboard at `/admin`

## Customer Account
- **Email**: customer@shop.co
- **Password**: customer123
- **Access**: Regular customer features (shopping, cart, orders)

## Setup Instructions

1. **Seed Test Users**:
   ```bash
   cd backend
   node data/seedUsers.js
   ```

2. **Login**:
   - Go to `/login`
   - Use credentials above
   - Admin users will see "Admin Dashboard" in profile dropdown

## Features to Test

### Admin (admin@shop.co)
- ✅ Access admin dashboard at `/admin`
- ✅ View statistics (products, orders, users, revenue)
- ✅ View all products in table format
- ✅ Monitor stock levels

### Customer (customer@shop.co)
- ✅ Browse products
- ✅ Add items to cart
- ✅ Complete checkout
- ✅ View order history
- ✅ Add products to wishlist
- ✅ Leave product reviews
