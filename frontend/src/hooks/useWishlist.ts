import { useState, useEffect } from 'react';
import { Product } from '../types';
import * as wishlistService from '../services/wishlistService';
import { useAuth } from '../context/AuthContext';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist();
    }
  }, [isAuthenticated]);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const data = await wishlistService.getWishlist();
      setWishlist(data.products || []);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    try {
      const data = await wishlistService.addToWishlist(productId);
      setWishlist(data.products || []);
    } catch (error) {
      throw error;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await wishlistService.removeFromWishlist(productId);
      setWishlist(wishlist.filter(p => p._id !== productId));
    } catch (error) {
      throw error;
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p._id === productId);
  };

  return { wishlist, loading, addToWishlist, removeFromWishlist, isInWishlist };
};
