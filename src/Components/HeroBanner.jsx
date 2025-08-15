import React from "react";
import BannerImage from "../assets/banner.jpg";
import Button from "./Button.jsx";

const HeroBanner = () => {
  return (
    <div className='hero-banner h-[50vh] lg:h-[60vh] bg-hero-pattern bg-cover bg-center rounded-2xl overflow-hidden shadow-lg relative'>
      <img
        src={BannerImage}
        alt='Banner'
        className='w-full h-full object-cover opacity-70 '
      />
      <div className='absolute top-0 left-0 w-full flex flex-col items-center justify-center h-full bg-black/60'>
        <h1 className='text-2xl font-bold text-white px-5 text-center lg:leading-14 '  >Elevate Your Shopping Experience With "Buylo".</h1>
        <p className='my-2 md:my-4 lg:my-6 !mt-2.5 md:!mt-2 text-[12px] md:text-[14px] lg:text-[16px] xl:text-lg text-white/90 text-center px-10'>
            Buylo brings you unbeatable prices, trendy products, and a seamless shopping experience, making every purchase exciting, rewarding, and worth sharing.
        </p>
        <Button className={'text-white'} label="Shop Now"  />
      </div>
    </div>
  );
};

export default HeroBanner;
