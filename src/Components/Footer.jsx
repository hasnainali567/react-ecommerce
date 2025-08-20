import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
const Footer = () => {
  return (
    <div className='bg-light-secondary pt-10 px-5 sm:px-10 md:px-20 lg:px-30 xl:px-40 flex flex-col items-center'>
      <div className='w-full flex flex-wrap gap-4 sm:gap-10 md:gap-15 lg:gap-20 items-center justify-center pb-5 text-light-text text-sm lg:text-base'>
        <span className="cursor-pointer">About us</span>
        <span className="cursor-pointer">Contact</span>
        <span className="cursor-pointer">Privacy Policy</span>
        <span className="cursor-pointer">Terms of Service</span>
      </div>
      <div className="flex items-center gap-4 pb-5 text-light-text">
        <span className="cursor-pointer">
            <CiTwitter />
        </span>
        <span className="cursor-pointer">
            <FaInstagram />
        </span>
        <span className="cursor-pointer">
            <FaFacebookF />
        </span>
      </div>
      <div className="text-center text-light-text flex flex-col gap-2 pb-5 text-sm lg:text-md">
        <p>&copy; 2025 Buylo. All rights reserved.</p>
        <p>Made with ❤️ by Hasnain</p>
      </div>
    </div>
  );
};

export default Footer;
