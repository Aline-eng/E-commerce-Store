import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

const ProductFilters: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);

  const handleCategoryChange = (category: string) => {
    const newCategories = categories.includes(category)
      ? categories.filter(c => c !== category)
      : [...categories, category];
    setCategories(newCategories);
    onFilterChange({ categories: newCategories, priceRange, minRating, inStock });
  };

  const handlePriceChange = (value: number, index: number) => {
    const newRange: [number, number] = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
    onFilterChange({ categories, priceRange: newRange, minRating, inStock });
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
    onFilterChange({ categories, priceRange, minRating: rating, inStock });
  };

  const handleStockChange = () => {
    setInStock(!inStock);
    onFilterChange({ categories, priceRange, minRating, inStock: !inStock });
  };

  const clearFilters = () => {
    setCategories([]);
    setPriceRange([0, 1000]);
    setMinRating(0);
    setInStock(false);
    onFilterChange({ categories: [], priceRange: [0, 1000], minRating: 0, inStock: false });
  };

  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Category</h4>
            <div className="space-y-2">
              {['Electronics', 'Fashion', 'Home'].map((category) => (
                <label key={category} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Price Range</h4>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                    {rating}
                    <svg className="w-4 h-4 text-yellow-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    & up
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Availability</h4>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={handleStockChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">In Stock Only</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
