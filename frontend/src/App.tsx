import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Orders from './components/Orders';
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/Toast';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </main>
            <ToastContainer />
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
