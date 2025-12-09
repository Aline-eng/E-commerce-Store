import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  featured?: boolean;
}

const TopSelling: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      const sorted = Array.isArray(data) ? data.sort((a, b) => b.rating - a.rating).slice(0, 4) : [];
      setProducts(sorted);
    } catch (error) {
      console.error('Failed to load products');
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast('Added to cart!', 'success');
  };

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-4xl font-black text-center text-gray-900 dark:text-white">TOP SELLING</h2>
        
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product._id} className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg dark:bg-black dark:border-gray-800 hover:shadow-lg">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className="object-cover w-full h-64" />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-gray-900 dark:text-white">${product.price}</span>
                  <button onClick={() => handleAddToCart(product)} className="btn-sm">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/products" className="btn-secondary">
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopSelling;
