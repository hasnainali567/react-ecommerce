import React, { useState } from "react";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMdCart } from "react-icons/io";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { Link, useNavigate } from "react-router";
import { Modal, Badge } from "antd";
import Button from "./Button.jsx";
import { useSelector } from "react-redux";

export const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState('');
  const handleOk = () => {
    setIsModalOpen(false);
  };

  let [openSearch, setOpenSearch] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const user = useSelector((state) => state.user.userInfo);
  

  

  return (
    <div className={`header z-100 bg-white sticky top-0 flex items-center justify-between p-2.5 px-5 sm:px-10 md:px-15 lg:px-20 xl:px-30 bg-dark border-b-2 border-black/5 ${openSearch ? '' : 'overflow-hidden'}`}>
      <div className='flex items-center gap-7'>
        <Link to={"/"}>
          <div className='flex items-center gap-1 text-dark-primary'>
            <RiShoppingBag4Line className='font-medium' />
            <h1 className='text-md font-medium'>Buylo</h1>
          </div>
        </Link>
        <div className='items-center gap-7  text-sm hidden lg:flex'>
          <span
            onClick={() => {
              navigate("/products/?q=new-arrival");
            }}
            className='cursor-pointer text-light-text hover:text-black/70 hover:scale-102'
          >
            New Arrivals
          </span>
          <span
            onClick={() => {
              navigate("/products/?q=best-sellers");
            }}
            className='cursor-pointer text-light-text hover:text-black/70 hover:scale-102'
          >
            Best Sellers
          </span>
          <span
            onClick={() => {
              navigate("/products/?q=sale");
            }}
            className='cursor-pointer text-light-text hover:text-black/70 hover:scale-102'
          >
            Sale
          </span>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div onClick={()=> setOpenSearch(prev => !prev)} className="sm:hidden rounded-md bg-light-secondary p-2.5 cursor-pointer hover:scale-102 active:bg-light-secondary/30 active:scale-95 transition-all">
          <HiMiniMagnifyingGlass className='text-light-text text-xl' />
        </div>
        <label
          htmlFor='search'
          className={`absolute top-[110%] w-[90%] content-center ${openSearch ? 'right-[5%] opacity-100' : 'right-[-100%] opacity-0'} sm:opacity-100 shadow-2xl shadow-light-text sm:shadow-none transition-all  duration-250   sm:right-0  sm:relative bg-light-secondary items-center rounded-md flex justify-between`}
        >
          <div className='ps-2.5 text-lg text-black/50'>
            <HiMiniMagnifyingGlass className='text-light-text' />
          </div>
          <input
            onChange={(e)=> setInput(e.target.value)}
            type='text'
            id='search'
            className={`border-0 flex-1 outline-none p-2 placeholder:text-light-text w-30 sm:w-35 md:w-40 lg:w-50`}
            placeholder='Search...'
          />
          <button onClick={()=> navigate(`/products?search=${input}`)} className='bg-light-text text-white p-2 rounded-r-md cursor-pointer'>
            Search
          </button>
        </label>
        <div onClick={() => navigate("/user-profile#cart")} className='relative rounded-md bg-light-secondary p-1 pt-2.5 px-2.5 cursor-pointer hover:scale-102 active:bg-light-secondary/30 active:scale-95 transition-all'>
          <Badge count={user?.cart?.length} style={{top: "-5px", right: "-7px"}} className='absolute'>
            <IoMdCart className='text-light-text text-xl' />
          </Badge>
        </div>

        <div
          onClick={() =>
            user === null
              ? setIsModalOpen(true)
              : navigate("/user-profile")
          }
          className='rounded-full bg-light-secondary cursor-pointer hover:scale-102 active:bg-light-secondary/30 active:scale-95 transition-all overflow-hidden'
        >
          <img
            src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
            alt=''
            className='w-10 h-10 object-cover'
          />
        </div>

        {!user && (
          <Modal
            title='User Profile'
            open={isModalOpen}
            onOk={handleOk}
            footer={null}
            onCancel={handleCancel}
            style={{ top: "20px" }}
            className='flex flex-col'
          >
            <div className='flex flex-col gap-4 mt-4'>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
                className={
                  "text-white border-2 border-light-text bg-light-text active:bg-light-secondary active:text-light-text active:border-light-text active:border-2"
                }
                label={"Sign UP"}
              ></Button>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                className={
                  "border-light-text border-2 bg-light-secondary text-light-text active:text-white active:bg-light-text"
                }
                label={"Log IN"}
              ></Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};
