import React from 'react';

const BrandSection: React.FC = () => {
  const brands = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'];

  return (
    <div className="py-12 bg-black dark:bg-gray-950">
      <div className="container px-4 mx-auto overflow-hidden">
        <div className="flex items-center justify-around gap-12 animate-scroll">
          {brands.map((brand, index) => (
            <div key={index} className="text-3xl font-black text-white whitespace-nowrap">
              {brand}
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {brands.map((brand, index) => (
            <div key={`dup-${index}`} className="text-3xl font-black text-white whitespace-nowrap">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
