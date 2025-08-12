import React from 'react'
import { HeroBanner, FeaturedProducts, NewsLetter, BreadCrumb } from '../Components';
const Home = () => {

  return (
    <div className='w-full px-10 md:px-20 lg:px-30 xl:px-40 py-6 flex flex-col gap-6'>
        <HeroBanner />
        <FeaturedProducts />
        <NewsLetter />
    </div>
  );
}


export default Home;