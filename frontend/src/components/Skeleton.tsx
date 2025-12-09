import React from 'react';

export const ProductCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
    <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-md mb-4"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="max-w-6xl mx-auto p-6 animate-pulse">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-gray-300 dark:bg-gray-700 h-96 rounded-lg"></div>
      <div className="space-y-4">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  </div>
);
