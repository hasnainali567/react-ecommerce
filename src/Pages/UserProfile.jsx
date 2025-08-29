import React from "react";
import { useSelector } from "react-redux";
import { BreadCrumb, CartItem, CheckOutSummary, ProfileDivider } from "../Components";
import { auth } from "../Firebase/Firebase";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const user = useSelector((state) => state.user.userInfo);

  React.useEffect(() => {
    if (auth.currentUser) {
      setIsAdmin(
        auth.currentUser.email === "hasnain5f7@gmail.com" &&
          auth.currentUser.uid === "iQLAvQYCsHWq0nQWj58Gs47uu6T2" &&
          user.role === "admin"
      );
    }
  }, [user.role]);

  const handleLogout = async () => {
    await auth.signOut();
    window.location.reload();
  };
  return (
    <div className='relative flex flex-col gap-3 bg-light-primary px-5 sm:px-10 md:px-15 lg:px-20 xl:px-30'>
      <div className='flex items-center py-3  gap-1.5'>
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
      <h2 className=' py-3 text-2xl xs:text-3xl font-bold xs:font-semibold text-light-text'>
        My Profile
      </h2>
      <div className={`py-3 xxs:py-6 flex flex-col items-center  ${isAdmin ? "md:flex-row " : "xs:flex-row "} gap-4 xs:py-4 rounded-md`}>
        <img
          src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
          alt=''
          className={`w-30 h-30 ${isAdmin ? 'md:w-30 md:h-30' : 'sm:w-35 sm:h-35'} rounded-full`}
        />
        <div className={`flex flex-col items-center  ${isAdmin ? 'md:items-baseline' : 'xs:items-baseline'}`}>
          <h3 className='text-3xl xs:text-xl font-semibold text-light-text capitalize'>
            {user.username}
          </h3>
          <p className='text-dark-text text-sm md:text-md'>{user.email}</p>
          <p className='text-dark-text text-sm md:text-md'>
            Joined on: January 1, 2023
          </p>
        </div>
        <div className={`flex items-center gap-2 ${isAdmin ? 'md:ml-auto' : 'xs:ml-auto'}`}>
          <button
            onClick={handleLogout}
            className='bg-dark-secondary text-white text-sm md:text-md px-4 xxs:px-5 py-2 rounded-md cursor-pointer hover:shadow-md'
          >
            Log out
          </button>
          {isAdmin && (
            <button
              onClick={() => {
                navigate("/dashboard");
              }}
              className='bg-dark-secondary text-white px-4 xxs:px-5 xs:px-4 text-sm md:text-md  py-2 rounded-md cursor-pointer hover:shadow-md'
            >
              goto Dashboard
            </button>
          )}
          </div>
      </div>
      <div
        id='cart'
        className=' py-3 xxs:py-4  sm:py-3.5 md:py-5 min-h-50'
      >
        <ProfileDivider />
        
      </div>
    </div>
  );
};

export default UserProfile;
