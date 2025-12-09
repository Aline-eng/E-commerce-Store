import React from 'react';

const Reviews: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah M.',
      rating: 5,
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
      name: 'Alex K.',
      rating: 5,
      text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
    },
    {
      name: 'James L.',
      rating: 5,
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
    }
  ];

  return (
    <div className="py-16 bg-white dark:bg-black">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-4xl font-black text-gray-900 dark:text-white">OUR HAPPY CUSTOMERS</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg dark:border-gray-800">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 font-bold text-gray-900 dark:text-white">{review.name}</p>
              <p className="text-gray-600 dark:text-gray-400">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
