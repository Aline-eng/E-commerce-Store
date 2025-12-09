import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/Toast';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                    <Route path="/orders" element={<Orders />} />
                  </Routes>
                </main>
                <Footer />
                <ToastContainer />
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
