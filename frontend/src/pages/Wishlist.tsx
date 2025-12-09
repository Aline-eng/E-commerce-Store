import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Wishlist: React.FC = () => {
  const { wishlist, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleRemove = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
      showToast('Removed from wishlist', 'success');
    } catch (error) {
      showToast('Failed to remove', 'error');
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    showToast('Added to cart!', 'success');
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Your wishlist is empty</p>
          <Link to="/" className="text-blue-600 hover:underline">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600">{product.name}</h3>
                </Link>
                <p className="text-xl font-bold text-blue-600 mb-4">${product.price}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition"
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
