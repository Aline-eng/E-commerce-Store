import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts, getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../hooks/useWishlist';
import { useToast } from '../context/ToastContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
}

interface Review {
  _id: string;
  user: { name: string };
  rating: number;
  comment: string;
  createdAt: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
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

  useEffect(() => {
    if (product) {
      loadRelatedProductsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id!);
      setProduct(data);
      setSelectedImage(data.image);
    } catch (error) {
      console.error('Failed to load product:', error);
      showToast('Failed to load product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      setReviewLoading(true);
      // Mock reviews - replace with actual API call when endpoint is available
      const mockReviews: Review[] = [
        {
          _id: '1',
          user: { name: 'John Doe' },
          rating: 5,
          comment: 'Great product! Highly recommended.',
          createdAt: new Date().toISOString(),
        },
        {
          _id: '2',
          user: { name: 'Jane Smith' },
          rating: 4,
          comment: 'Good quality, fast shipping.',
          createdAt: new Date().toISOString(),
        },
      ];
      setReviews(mockReviews);
    } catch (error) {
      console.error('Failed to load reviews:', error);
      showToast('Failed to load reviews', 'error');
    } finally {
      setReviewLoading(false);
    }
  };

  const loadRelatedProductsData = async () => {
    try {
      if (!product) return;

      const allProducts = await getProducts();

      // Filter products from same category, exclude current product
      const related = allProducts
        .filter(
          (p: Product) =>
            p.category === product.category && p._id !== product._id
        )
        .slice(0, 4); // Show max 4 related products

      setRelatedProducts(related);
    } catch (error) {
      console.error('Failed to load related products:', error);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      showToast('Please login to review', 'error');
      return;
    }

    if (comment.trim().length < 10) {
      showToast('Review must be at least 10 characters', 'error');
      return;
    }

    try {
      setReviewLoading(true);
      // Mock review creation - replace with actual API call when endpoint is available
      const newReview: Review = {
        _id: Date.now().toString(),
        user: { name: 'Current User' },
        rating,
        comment,
        createdAt: new Date().toISOString(),
      };

      setReviews([newReview, ...reviews]);
      setComment('');
      setRating(5);
      showToast('Review added successfully!', 'success');
    } catch (error: any) {
      console.error('Failed to add review:', error);
      showToast('Failed to add review', 'error');
    } finally {
      setReviewLoading(false);
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

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      showToast('Added to cart!', 'success');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Product not found
        </h2>
        <Link to="/" className="btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="p-6 mx-auto max-w-7xl">
      {/* Breadcrumb */}
      <div className="flex gap-2 mb-8 text-gray-600">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      {/* Product Detail Grid */}
      <div className="grid gap-12 mb-12 md:grid-cols-2">
        {/* Images Section */}
        <div>
          <div className="mb-4 overflow-hidden shadow-lg rounded-2xl">
            <img
              src={selectedImage}
              alt={product.name}
              className="object-cover w-full h-96"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg flex-shrink-0 border-2 transition ${
                  selectedImage === img
                    ? 'border-black dark:border-white'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div>
          <p className="mb-2 text-sm text-gray-600 uppercase dark:text-gray-400">
            {product.category}
          </p>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            {product.name}
          </h1>

          {/* Rating and Reviews Count */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-blue-600">
              ${product.price}
            </span>
            <span className="text-lg text-yellow-500">
              ★ {product.rating.toFixed(1)}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              ({product.reviewCount || 0} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={handleWishlist}
              className={`px-6 py-3 rounded-lg transition font-semibold ${
                isInWishlist(id!)
                  ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {isInWishlist(id!) ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
            </button>
          </div>

          {/* Product Info */}
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </p>
            <div className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
              <p>✓ Free shipping on orders over $100</p>
              <p>✓ 30-day return policy</p>
              <p>✓ 1-year warranty</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="p-8 mb-12 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Customer Reviews
        </h2>

        {/* Add Review Form */}
        {isAuthenticated && (
          <form
            onSubmit={handleAddReview}
            className="p-6 mb-8 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <h3 className="mb-4 font-bold dark:text-white">Leave a Review</h3>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="px-4 py-2 border rounded-lg dark:bg-gray-600 dark:text-white dark:border-gray-500"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Stars
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:text-white dark:border-gray-500"
                rows={4}
                required
                minLength={10}
                placeholder="Share your experience with this product..."
              />
            </div>

            <button
              type="submit"
              disabled={reviewLoading}
              className="px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {reviewLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}

        {!isAuthenticated && (
          <p className="p-4 mb-6 text-sm text-blue-600 rounded-lg bg-blue-50 dark:bg-blue-900 dark:text-blue-300">
            <Link to="/login" className="font-semibold underline">
              Login
            </Link>{' '}
            to write a review
          </p>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="py-8 text-center text-gray-500 dark:text-gray-400">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="pb-4 border-b dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-blue-500 rounded-full">
                    {review.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {review.user.name}
                    </p>
                    <p className="text-sm text-yellow-500">
                      {'★'.repeat(review.rating)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct._id}
                className="overflow-hidden transition-shadow bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-xl"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h3 className="mb-2 font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-500">
                      ★ {relatedProduct.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({relatedProduct.reviewCount || 0})
                    </span>
                  </div>
                  <p className="mb-3 text-lg font-bold text-blue-600">
                    ${relatedProduct.price}
                  </p>
                  <Link
                    to={`/product/${relatedProduct._id}`}
                    className="block w-full px-4 py-2 text-center text-gray-900 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
