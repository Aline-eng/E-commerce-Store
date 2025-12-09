import api from './authService';

export const getProductReviews = async (productId: string) => {
  const { data } = await api.get(`/reviews/${productId}`);
  return data;
};

export const createReview = async (productId: string, rating: number, comment: string) => {
  const { data } = await api.post(`/reviews/${productId}`, { rating, comment });
  return data;
};

export const deleteReview = async (reviewId: string) => {
  await api.delete(`/reviews/${reviewId}`);
};
