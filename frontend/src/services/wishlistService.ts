import api from './authService';

export const getWishlist = async () => {
  const { data } = await api.get('/wishlist');
  return data;
};

export const addToWishlist = async (productId: string) => {
  const { data } = await api.post('/wishlist', { productId });
  return data;
};

export const removeFromWishlist = async (productId: string) => {
  await api.delete(`/wishlist/${productId}`);
};
