import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
const Footer = () => {
  return (
    <div className='bg-light-secondary pt-10 px-50 flex flex-col items-center'>
      <div className='w-full flex items-center justify-between pb-10 text-light-text'>
        <span className="cursor-pointer">About us</span>
        <span className="cursor-pointer">Contact</span>
        <span className="cursor-pointer">Privacy Policy</span>
        <span className="cursor-pointer">Terms of Service</span>
      </div>
      <div className="flex items-center gap-4 pb-10 text-light-text">
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
      <div className="text-center text-light-text flex flex-col gap-2 pb-10">
        <p>&copy; 2025 Buylo. All rights reserved.</p>
        <p>Made with ❤️ by Hasnain</p>
      </div>
    </div>
  );
};

export default Footer;
