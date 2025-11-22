import React, { useEffect, useCallback, useState } from 'react';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  featured?: boolean;
}

const ProductList: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'Electronics', 'Fashion', 'Home'];

  const loadProducts = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    
    const data = await getProducts();
    console.log('Loaded products data:', data); // Debug log
    
    // Handle different response formats
    let productsArray;
    if (Array.isArray(data)) {
      productsArray = data;
    } else if (data && data.products && Array.isArray(data.products)) {
      productsArray = data.products;
    } else {
      productsArray = [];
    }
    
    console.log('Processed products:', productsArray); // Debug log
    setProducts(productsArray);
  } catch (err: any) {
    console.error('Error loading products:', err);
    setError(err.response?.data?.message || 'Failed to load products');
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Show visual feedback
    const button = document.getElementById(`add-to-cart-${product._id}`);
    if (button) {
      button.textContent = 'Added!';
      button.classList.add('bg-green-600');
      setTimeout(() => {
        button.textContent = product.stock === 0 ? 'Out of Stock' : 'Add to Cart';
        button.classList.remove('bg-green-600');
      }, 1000);
    }
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="w-1/4 h-8 mb-8 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="overflow-hidden bg-white rounded-lg shadow-card">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
                  <div className="flex items-center justify-between">
                    <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
                    <div className="w-1/3 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="p-6 text-center border border-red-200 rounded-lg bg-red-50">
          <div className="mb-2 text-lg font-semibold text-red-600">Error Loading Products</div>
          <div className="mb-4 text-red-500">{error}</div>
          <button
            onClick={loadProducts}
            className="px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Our Products</h1>
        <p className="text-gray-600">Discover amazing products at great prices</p>
      </div>

      {/* Search and Filter Section */}
      <div className="p-6 mb-8 bg-white rounded-lg shadow-soft">
        <div className="flex flex-col items-end gap-4 md:flex-row">
          <div className="flex-1">
            <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
              Search Products
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search by name or description..."
                className="w-full py-3 pl-10 pr-4 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-48">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
              Filter by Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-auto">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="w-full px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-lg md:w-auto hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </div>
        <div className="text-sm text-gray-500">
          {searchTerm && `Search: "${searchTerm}"`}
          {selectedCategory !== 'all' && ` • Category: ${selectedCategory}`}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map(product => (
            <div 
              key={product._id} 
              className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-lg shadow-card hover:shadow-soft"
            >
              {/* Product Image */}
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-48"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
                {product.featured && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 text-xs font-semibold text-white rounded bg-primary-500">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className="flex items-center px-2 py-1 text-xs font-semibold text-gray-700 bg-white rounded bg-opacity-90">
                    <svg className="w-3 h-3 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    {product.rating}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded text-primary-600 bg-primary-50">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="h-12 mb-2 font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="h-10 mb-3 text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <div className="mt-1 text-xs text-gray-500">
                      {product.stock > 0 ? (
                        <span className="text-green-600">{product.stock} in stock</span>
                      ) : (
                        <span className="text-red-600">Out of stock</span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  id={`add-to-cart-${product._id}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95'
                  }`}
                >
                  {product.stock === 0 ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Out of Stock</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center bg-white rounded-lg shadow-soft">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">No products found</h3>
          <p className="mb-4 text-gray-600">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="px-6 py-2 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;