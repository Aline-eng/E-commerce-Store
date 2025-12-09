import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-16 bg-white dark:bg-black">
      <div className="container px-4 mx-auto max-w-4xl">
        <h1 className="mb-8 text-5xl font-black text-gray-900 dark:text-white">About Us</h1>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <p className="text-lg">
            Welcome to SHOP.CO, your number one source for all things fashion. We're dedicated to giving you the very best of clothing, with a focus on quality, customer service, and uniqueness.
          </p>

          <h2 className="mt-8 text-3xl font-bold text-gray-900 dark:text-white">Our Story</h2>
          <p>
            Founded in 2000, SHOP.CO has come a long way from its beginnings. When we first started out, our passion for eco-friendly and stylish fashion drove us to start our own business.
          </p>

          <h2 className="mt-8 text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          <p>
            We now serve customers all over the world and are thrilled that we're able to turn our passion into our own website. We hope you enjoy our products as much as we enjoy offering them to you.
          </p>

          <h2 className="mt-8 text-3xl font-bold text-gray-900 dark:text-white">Why Choose Us?</h2>
          <ul className="space-y-3 list-disc list-inside">
            <li>Over 200 international brands</li>
            <li>2,000+ high-quality products</li>
            <li>30,000+ happy customers worldwide</li>
            <li>Fast and reliable shipping</li>
            <li>24/7 customer support</li>
            <li>Easy returns and exchanges</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
