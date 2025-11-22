import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { state } = useCart();
  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? 'text-primary-600 font-semibold'
      : 'text-gray-600 hover:text-primary-600';
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            ShopEasy
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/" className={getLinkClass('/')}>
              Products
            </Link>
            <Link to="/orders" className={getLinkClass('/orders')}>
              Orders
            </Link>
            <Link to="/cart" className="flex items-center space-x-1 text-gray-600 hover:text-primary-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="bg-primary-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {state.items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;