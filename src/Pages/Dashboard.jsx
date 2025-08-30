import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaXmark } from "react-icons/fa6";
import { getAllOrders } from "../Components/Features/UserSlice";
import {
  AdminProducts,
  AdminOrders,
  AdminSettings,
  AdminOverview,
} from "../Components";

const Dashboard = () => {
  const [menu, setMenu] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState("Overview");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className='relative flex size-full min-h-150 flex-col bg-[#121118] dark group/design-root overflow-x-hidden scroll-bar'>
      <div className='layout-container flex h-full grow flex-col'>
        <div className='gap-1 px-3 sm:px-4 lg:px-6 flex flex-1 justify-center py-5'>
          <div className='hidden  md:flex layout-content-container flex-col w-60 lg:w-72 2xl:w-80 flex-shrink-0'>
            <div className='flex h-full flex-col justify-between bg-[#121118] p-2 lg-px-4'>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                  <h1 className='text-white text-base font-medium leading-normal'>
                    Admin Panel
                  </h1>
                  <p className='text-[#a09bbb] text-sm font-normal leading-normal'>
                    Manage your store
                  </p>
                </div>
                <div className='flex flex-col gap-2'>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                      activeMenu === "Overview" ? "bg-[#3a374a]" : ""
                    }`}
                    onClick={() => setActiveMenu("Overview")}
                  >
                    <div
                      className='text-white'
                      data-icon='PresentationChart'
                      data-size='24px'
                      data-weight='fill'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24px'
                        height='24px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM104,144a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32,0a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z'></path>
                      </svg>
                    </div>
                    <p className='text-white text-sm font-medium leading-normal'>
                      Overview
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer  ${
                      activeMenu === "Products" ? "bg-[#3a374a]" : ""
                    }`}
                    onClick={() => setActiveMenu("Products")}
                  >
                    <div
                      className='text-white'
                      data-icon='ListBullets'
                      data-size='24px'
                      data-weight='fill'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24px'
                        height='24px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M56,128a16,16,0,1,1-16-16A16,16,0,0,1,56,128ZM40,48A16,16,0,1,0,56,64,16,16,0,0,0,40,48Zm0,128a16,16,0,1,0,16,16A16,16,0,0,0,40,176Zm176-64H88a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V120A8,8,0,0,0,216,112Zm0-64H88a8,8,0,0,0-8,8V72a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48Zm0,128H88a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V184A8,8,0,0,0,216,176Z'></path>
                      </svg>
                    </div>
                    <p className='text-white text-sm font-medium leading-normal'>
                      Products
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                      activeMenu === "Orders" ? "bg-[#3a374a]" : ""
                    }`}
                    onClick={() => setActiveMenu("Orders")}
                  >
                    <div
                      className='text-white'
                      data-icon='Receipt'
                      data-size='24px'
                      data-weight='regular'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24px'
                        height='24px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M72,104a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,104Zm8,40h96a8,8,0,0,0,0-16H80a8,8,0,0,0,0,16ZM232,56V208a8,8,0,0,1-11.58,7.15L192,200.94l-28.42,14.21a8,8,0,0,1-7.16,0L128,200.94,99.58,215.15a8,8,0,0,1-7.16,0L64,200.94,35.58,215.15A8,8,0,0,1,24,208V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V195.06l20.42-10.22a8,8,0,0,1,7.16,0L96,199.06l28.42-14.22a8,8,0,0,1,7.16,0L160,199.06l28.42-14.22a8,8,0,0,1,7.16,0L216,195.06Z'></path>
                      </svg>
                    </div>
                    <p className='text-white text-sm font-medium leading-normal'>
                      Orders
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer  ${
                      activeMenu === "Settings" ? "bg-[#3a374a]" : ""
                    }`}
                    onClick={() => setActiveMenu("Settings")}
                  >
                    <div
                      className='text-white'
                      data-icon='Gear'
                      data-size='24px'
                      data-weight='regular'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24px'
                        height='24px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z'></path>
                      </svg>
                    </div>
                    <p className='text-white text-sm font-medium leading-normal'>
                      Settings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`md:hidden absolute top-0 ${
              menu ? "left-0" : "-left-full"
            } transition-all duration-300 ease-in-out bottom-0 z-10 shadow-2xl p-2 bg-light-primary flex layout-content-container flex-col w-72  flex-shrink-0`}
          >
            <div className='flex h-full flex-col justify-between bg-[#121118] p-2 lg-px-4'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col'>
                    <h1 className='text-white text-base font-medium leading-normal'>
                      Admin Panel
                    </h1>
                    <p className='text-[#a09bbb] text-sm font-normal leading-normal'>
                      Manage your store
                    </p>
                  </div>
                  <div onClick={() => setMenu(false)} className='text-white'>
                    <FaXmark size={24} />
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                      activeMenu === "Overview" ? "bg-[#3a374a]" : ""
                    }`}
                    onClick={() => setActiveMenu("Overview")}
                  >
                    <div
                      className='text-white'
                      data-icon='PresentationChart'
                      data-size='24px'
                      data-weight='fill'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24px'
                        height='24px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM104,144a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32,0a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z'></path>
                      </svg>
                    </div>
                    <p className='text-white text-sm font-medium leading-normal'>
                      Overview
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer  ${
                      activeMenu === "Products" ? "bg-[#3a374a]" : ""
                    }`}
                    onClick={() => setActiveMenu("Products")}
                  >
                    <div
                      className='text-white'
                      data-icon='ListBullets'
                      data-size='24px'
                      data-weight='fill'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24px'
                        height='24px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M56,128a16,16,0,1,1-16-16A16,16,0,0,1,56,128ZM40,48A16,16,0,1,0,56,64,16,16,0,0,0,40,48Zm0,128a16,16,0,1,0,16,16A16,16,0,0,0,40,176Zm176-64H88a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V120A8,8,0,0,0,216,112Zm0-64H88a8,8,0,0,0-8,8V72a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48Zm0,128H88a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V184A8,8,0,0,0,216,176Z'></path>
                      </svg>
                    </div>
                    <p className='text-white text-sm font-medium leading-normal'>
                      Products
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                      activeMenu === "Orders" ? "bg-[#3a374a]" : ""
                    }`}
                    onClick={() => setActiveMenu("Orders")}
                  >
                    <div
                      className='text-white'
                      data-icon='Receipt'
                      data-size='24px'
                      data-weight='regular'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24px'
                        height='24px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M72,104a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,104Zm8,40h96a8,8,0,0,0,0-16H80a8,8,0,0,0,0,16ZM232,56V208a8,8,0,0,1-11.58,7.15L192,200.94l-28.42,14.21a8,8,0,0,1-7.16,0L128,200.94,99.58,215.15a8,8,0,0,1-7.16,0L64,200.94,35.58,215.15A8,8,0,0,1,24,208V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V195.06l20.42-10.22a8,8,0,0,1,7.16,0L96,199.06l28.42-14.22a8,8,0,0,1,7.16,0L160,199.06l28.42-14.22a8,8,0,0,1,7.16,0L216,195.06Z'></path>
                      </svg>
                    </div>
                    <p className='text-white text-sm font-medium leading-normal'>
                      Orders
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                      activeMenu === "Settings" ? "bg-[#3a374a]" : ""
                    }`}
                    onClick={() => setActiveMenu("Settings")}
                  >
                    <div
                      className='text-white'
                      data-icon='Gear'
                      data-size='24px'
                      data-weight='regular'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24px'
                        height='24px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z'></path>
                      </svg>
                    </div>
                    <p className='text-white text-sm font-medium leading-normal'>
                      Settings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {activeMenu === "Overview" && (
            <AdminOverview setMenu={setMenu} menu={menu} />
          )}
          {activeMenu === "Products" && (
            <AdminProducts setMenu={setMenu} menu={menu} />
          )}
          {activeMenu === "Orders" && (
            <AdminOrders setMenu={setMenu} menu={menu} />
          )}
          {activeMenu === "Settings" && (
            <AdminSettings setMenu={setMenu} menu={menu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
