import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="relative flex items-center ml-2 g-gray-100 dark:bg-gray-900">
      <div className="container grid items-center grid-cols-1 gap-12 px-4 mx-auto lg:grid-cols-2">
        {/* Left content */}
        <div>
          <h1 className="mb-6 text-5xl font-black leading-tight text-gray-900 dark:text-white lg:text-6xl">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>
          <Link to="/products" className="inline-block btn-primary">
            Shop Now
          </Link>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div>
              <p className="text-3xl font-black text-gray-900 dark:text-white">200+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">International Brands</p>
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900 dark:text-white">2,000+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">High-Quality Products</p>
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900 dark:text-white">30,000+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" 
            alt="Fashion models" 
            className="object-cover w-full rounded-2xl aspect-square"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
