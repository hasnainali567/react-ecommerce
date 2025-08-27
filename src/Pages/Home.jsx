import React from 'react'
import { HeroBanner, FeaturedProducts, NewsLetter, BreadCrumb } from '../Components';
const Home = () => {

  return (
    <div className='w-full px-5 sm:px-10 md:px-15 lg:px-20 xl:px-30 py-6 flex flex-col gap-6 bg-light-primary'>
        <HeroBanner />
        <FeaturedProducts />
        <NewsLetter />
    </div>
  );
}


export default Home;