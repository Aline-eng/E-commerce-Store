import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import { getProductReviews, createReview } from '../services/reviewService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../hooks/useWishlist';
import { useToast } from '../context/ToastContext';
import { Product, Review } from '../types';
import { ProductDetailSkeleton } from '../components/Skeleton';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    if (id) {
      loadProduct();
      loadReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await productAPI.getProduct(id!);
      setProduct(data);
      setSelectedImage(data.image);
    } catch (error) {
      showToast('Failed to load product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const data = await getProductReviews(id!);
      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews');
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast('Please login to review', 'error');
      return;
    }
    try {
      await createReview(id!, rating, comment);
      showToast('Review added!', 'success');
      setComment('');
      setRating(5);
      loadReviews();
      loadProduct();
    } catch (error: any) {
      showToast(error.response?.data?.error || 'Failed to add review', 'error');
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      showToast('Please login', 'error');
      return;
    }
    try {
      if (isInWishlist(id!)) {
        await removeFromWishlist(id!);
        showToast('Removed from wishlist', 'success');
      } else {
        await addToWishlist(id!);
        showToast('Added to wishlist', 'success');
      }
    } catch (error) {
      showToast('Failed to update wishlist', 'error');
    }
  };

  if (loading) return <ProductDetailSkeleton />;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <img src={selectedImage} alt={product.name} className="w-full h-96 object-cover rounded-2xl shadow-lg mb-4" />
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${selectedImage === img ? 'ring-2 ring-blue-600' : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-blue-600">${product.price}</span>
            <span className="text-yellow-500">★ {product.rating.toFixed(1)}</span>
            <span className="text-gray-600 dark:text-gray-400">({product.reviewCount || 0} reviews)</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => { addToCart(product); showToast('Added to cart!', 'success'); }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleWishlist}
              className={`px-6 py-3 rounded-lg transition ${isInWishlist(id!) ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-700'}`}
            >
              {isInWishlist(id!) ? '❤️' : '🤍'}
            </button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock} available</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h2>
        {isAuthenticated && (
          <form onSubmit={handleAddReview} className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Rating</label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="px-4 py-2 rounded-lg border dark:bg-gray-600 dark:text-white">
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-600 dark:text-white"
                rows={4}
                required
                minLength={10}
              />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              Submit Review
            </button>
          </form>
        )}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border-b dark:border-gray-700 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {review.user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{review.user.name}</p>
                  <p className="text-sm text-yellow-500">{'★'.repeat(review.rating)}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
              <p className="text-xs text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
