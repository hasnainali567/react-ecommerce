import React from "react";
import { useSelector } from "react-redux";
import { BreadCrumb, CartItem, CheckOutSummary } from "../Components";
import { auth } from "../Firebase/Firebase";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const UserProfile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    window.location.reload();
  };
  const user = useSelector((state) => state.user.userInfo);
  console.log("user from userProfile", user);
  return (
    <div className=' flex flex-col gap-3 bg-light-primary'>
      <div className='flex items-center py-3 px-5 sm:px-10 md:px-15 lg:px-20 xl:px-30 gap-1.5'>
        {/* 
            <button onClick={() => navigate("/")} className='hover:bg-light-secondary hover:text-gray-600 cursor-pointer text-light-text p-2 py-1 rounded-sm'>
                Home
            </button> */}
        <button
          onClick={() => navigate(-1)}
          className=' cursor-pointer text-light-text p-2.5 py-1 rounded-sm hover:bg-dark-secondary'
        >
          <FaArrowLeft size={14} />
        </button>
        <BreadCrumb />
      </div>
      <h2 className='px-5 sm:px-10 md:px-15 lg:px-20 xl:px-30 py-3 text-2xl xs:text-3xl font-bold xs:font-semibold text-light-text'>
        My Profile
      </h2>
      <div className='px-5 sm:px-10 md:px-15 lg:px-20 xl:px-30 py-3 xxs:py-6 flex flex-col xs:flex-row items-center gap-4 xs:py-4 rounded-md'>
        <img
          src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
          alt=''
          className='w-30 h-30 sm:w-35 sm:h-35 rounded-full'
        />
        <div className='flex flex-col items-center xs:items-baseline '>
          <h3 className='text-3xl xs:text-xl font-semibold text-light-text capitalize'>
            {user.username}
          </h3>
          <p className='text-dark-text text-sm sm:text-md'>{user.email}</p>
          <p className='text-dark-text text-sm sm:text-md'>
            Joined on: January 1, 2023
          </p>
        </div>
        <div className='flex items-center gap-2 xs:ml-auto'>
          <button
            onClick={handleLogout}
            className='bg-dark-secondary text-white px-10 xs:px-4 py-2 rounded-md cursor-pointer hover:shadow-md'
          >
            Log out
          </button>
          {(auth.currentUser.email === 'hasnain5f7@gmail.com' && auth.currentUser.uid === 'iQLAvQYCsHWq0nQWj58Gs47uu6T2' && user.role === 'admin') && (
            <button
              onClick={() => {
                navigate("/dashboard");
              }}
              className='bg-dark-secondary text-white px-10 xs:px-4 py-2 rounded-md cursor-pointer hover:shadow-md'
            >
              goto Dashboard
            </button>
          )}
          </div>
      </div>
      <div
        id='cart'
        className='px-5 sm:px-10 md:px-15 lg:px-20 xl:px-30 py-3 xxs:py-4  sm:py-3.5 md:py-5 min-h-50'
      >
        <h4 className='text-2xl text-light-text font-semibold py-1.5 xxs:py-2'>
          Shopping Cart{" "}
        </h4>
        <div className='flex flex-col gap-4 py-3'>
          {user.cart?.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <CheckOutSummary />
      </div>
    </div>
  );
};

export default UserProfile;
