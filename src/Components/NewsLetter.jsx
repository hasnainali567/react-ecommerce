import React from "react";

const NewsLetter = () => {
  return (
    <div className='p-4 py-10 md:py-15 lg-py-20 rounded-lg md:mt-4 flex flex-col items-center '>
      <h2 className='text-2xl sm:text-3xl font-semibold mb-2 sm:mb-3 text-light-text'>Stay Updated</h2>
      <p className='text-sm text-dark-text mb-4 text-center'>
        Get the latest News, exclusive offers, and more delivered right into
        your inbox
      </p>
      <label htmlFor='newsletter-email' className='mt-4 flex bg-light-secondary p-2 px-1.5 sm:px-2.5 rounded-md md:rounded-lg lg:rounded-xl'>
        <input
          type='email'
          id='newsletter-email'
          placeholder='Enter your email'
          className='w-40 sm:w-60 md:w-70 lg:w-80 outline-none ps-1 sm:ps-2 md:ps-3 text-sm sm:text-[16px] md:text-lg text-dark-text'
        />
        <button className=' p-1 px-1.5 sm:p-2 sm:px-3 md:p-2.5 md:px-3.5 bg-dark-text text-sm sm:text-[16px] md:text-lg text-light-primary rounded-sm sm:rounded-md cursor-pointer'>
          Subscribe
        </button>
      </label>
    </div>
  );
};

export default NewsLetter;
