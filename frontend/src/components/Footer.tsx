import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    alert(`Subscribed with ${email}`);
    setEmail('');
  };

  return (
    <footer className="mt-20 text-white bg-black dark:bg-gray-950">
      {/* Newsletter section */}
      <div className="container px-4 py-12 mx-auto mb-12">
        <div className="flex flex-col items-center justify-between gap-8 p-8 bg-black dark:bg-gray-900 border border-white dark:border-gray-800 rounded-3xl md:p-12 md:flex-row">
          <h3 className="text-3xl font-black md:text-4xl">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h3>
          <div className="flex flex-col w-full gap-4 md:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3 text-black dark:text-white dark:bg-gray-800 rounded-full outline-none md:w-80"
            />
            <button
              onClick={handleSubscribe}
              className="btn-primary"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container grid grid-cols-1 gap-8 px-4 py-12 mx-auto mb-8 border-t border-gray-700 dark:border-gray-800 md:grid-cols-5">
        {/* Brand */}
        <div>
          <h4 className="mb-4 text-2xl font-black">SHOP.CO</h4>
          <p className="text-sm text-gray-400">
            We have clothes that suits your style and which you're proud to wear. From women to men.
          </p>
          <div className="flex gap-4 mt-4 text-lg">
            <button onClick={() => {}} className="border-none cursor-pointer hover:text-gray-400 bg-none">𝕏</button>
            <button onClick={() => {}} className="border-none cursor-pointer hover:text-gray-400 bg-none">f</button>
            <button onClick={() => {}} className="border-none cursor-pointer hover:text-gray-400 bg-none">📷</button>
            <button onClick={() => {}} className="border-none cursor-pointer hover:text-gray-400 bg-none">▶</button>
          </div>
        </div>

        {/* Company */}
        <div>
          <h5 className="mb-4 font-bold tracking-wide uppercase">COMPANY</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="#" className="hover:text-white">About</Link></li>
            <li><Link to="#" className="hover:text-white">Features</Link></li>
            <li><Link to="#" className="hover:text-white">Works</Link></li>
            <li><Link to="#" className="hover:text-white">Career</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h5 className="mb-4 font-bold tracking-wide uppercase">HELP</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="#" className="hover:text-white">Customer Support</Link></li>
            <li><Link to="#" className="hover:text-white">Delivery Details</Link></li>
            <li><Link to="#" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h5 className="mb-4 font-bold tracking-wide uppercase">FAQ</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="#" className="hover:text-white">Account</Link></li>
            <li><Link to="#" className="hover:text-white">Manage Deliveries</Link></li>
            <li><Link to="#" className="hover:text-white">Orders</Link></li>
            <li><Link to="#" className="hover:text-white">Payments</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h5 className="mb-4 font-bold tracking-wide uppercase">RESOURCES</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="#" className="hover:text-white">Free eBooks</Link></li>
            <li><Link to="#" className="hover:text-white">Development Tutorial</Link></li>
            <li><Link to="#" className="hover:text-white">How to - Blog</Link></li>
            <li><Link to="#" className="hover:text-white">YouTube Playlist</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6 border-t border-gray-700 dark:border-gray-800">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 mx-auto text-sm text-gray-400 md:flex-row">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex gap-4">
            <span>💳</span>
            <span>🎭</span>
            <span>💰</span>
            <span>🏦</span>
            <span>🔐</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
