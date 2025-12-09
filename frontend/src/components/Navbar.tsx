import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../hooks/useWishlist';

const Navbar: React.FC = () => {
  const { state } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Promo bar */}
      <div className="py-2 text-sm text-center text-white bg-black dark:bg-gray-900">
        Sign up and get 20% off to your first order.{' '}
        <a href="#" className="font-semibold underline">
          Sign Up Now
        </a>
      </div>

      {/* Main navbar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-900">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black text-gray-900 dark:text-white">
            SHOP.CO
          </Link>

          {/* Menu */}
          <div className="items-center hidden gap-8 md:flex">
            <Link to="/" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
              Home
            </Link>
            <Link to="/about" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
              Contact Us
            </Link>
            <Link to="/faq" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
              FAQs
            </Link>
          </div>

          {/* Search and actions */}
          <div className="flex items-center gap-4">
            <div className="items-center flex-1 hidden px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full md:flex">
              <span className="text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 ml-2 text-sm bg-transparent outline-none text-gray-900 dark:text-white"
              />
            </div>

            <Link to="/cart" className="relative">
              <button className="text-2xl hover:text-gray-600 dark:hover:text-gray-400">🛒</button>
              {totalItems > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                {user?.name}
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn-primary"
              >
                Login
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="text-2xl text-gray-900 dark:text-white md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
