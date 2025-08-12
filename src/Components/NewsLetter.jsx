import React from "react";

const NewsLetter = () => {
  return (
    <div className='p-4 py-20 rounded-lg mt-4 flex flex-col items-center '>
      <h2 className='text-3xl font-semibold mb-2'>Stay Updated</h2>
      <p className='text-sm text-gray-600 mb-4'>
        Get the latest News, exclusive offers, and more delivered right into
        your inbox
      </p>
      <label htmlFor='newsletter-email' className='mt-4 flex bg-light-secondary p-2 px-2.5 rounded-xl'>
        <input
          type='email'
          id='newsletter-email'
          placeholder='Enter your email'
          className='w-80 outline-none ps-3 text-lg'
        />
        <button className=' p-2.5 px-5 bg-light-text text-lg text-white rounded-lg cursor-pointer'>
          Subscribe
        </button>
      </label>
    </div>
  );
};

export default NewsLetter;
