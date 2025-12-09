import React from 'react';
import Header from '../components/Header';
import BrandSection from '../components/BrandSection';
import NewArrivals from '../components/NewArrivals';
import TopSelling from '../components/TopSelling';
import Reviews from '../components/Reviews';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <BrandSection />
      <NewArrivals />
      <TopSelling />
      <Reviews />
    </>
  );
};

export default Home;
