import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/api';
import { ProductCardSkeleton } from './Skeleton';
import { useToast } from '../context/ToastContext';
import ProductFilters from './ProductFilters';

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
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
      setFilteredProducts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast('Added to cart!', 'success');
  };

  const handleFilter = (filters: any) => {
    let filtered = [...products];

    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.category));
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.minRating);
    }

    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="flex gap-8">
          <div className="flex-shrink-0 w-64"></div>
          <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-12 mx-auto text-center max-w-7xl">
        <p className="mb-4 text-red-600 dark:text-red-400">{error}</p>
        <button onClick={loadProducts} className="btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <h2 className="section-title dark:text-white">NEW ARRIVALS</h2>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilter({
              categories: [],
              priceRange: [0, 1000],
              minRating: 0,
              inStock: false
            })
          }}
          className="input-field dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div className="flex gap-8">
        <ProductFilters onFilterChange={handleFilter} />

        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} of {products.length} products
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="mb-4 text-gray-600 dark:text-gray-400">No products found</p>
              <button onClick={() => { setSearchTerm(''); handleFilter({ categories: [], priceRange: [0, 1000], minRating: 0, inStock: false }); }} className="btn-secondary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="card-hover dark:bg-gray-900 dark:border-gray-800"
                >
                  <Link to={`/product/${product._id}`}>
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-64"
                        loading="lazy"
                      />
                      <span className="absolute flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-900 bg-white rounded top-3 right-3 dark:bg-gray-800 dark:text-white">
                        <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link to={`/product/${product._id}`}>
                      <h3 className="mb-2 text-lg font-bold text-gray-900 transition dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-black text-gray-900 dark:text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full btn-primary"
                    >
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
