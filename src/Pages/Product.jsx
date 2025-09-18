import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { ProductLoading } from "../Components";
import { BreadCrumb } from "../Components";
import { useNavigate } from "react-router";
import { auth } from "../Firebase/Firebase";
import { Timestamp } from "firebase/firestore";
import useUpdateCart from "../hooks/useUpdateCart";
import { IoMdCart } from "react-icons/io";
import { Rate } from "antd";
import { message } from "antd";
import * as motion from "motion/react-client";
import { AnimatePresence } from "framer-motion";
import { FaPercent, FaShoppingBag } from "react-icons/fa";

const Product = () => {
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const { products, productStatus } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.user?.userInfo?.cart);
  const { addToCart } = useUpdateCart();
  const [messageApi, contextHolder] = message.useMessage();

  const product = products && products.find((item) => item.id === productId);
  const InCart = cart && cart.some((item) => item.id === product.id);
  const related =
    products &&
    products.filter(
      (item) => item.category === product.category && item.id !== productId
    );

  const [openImage, setOpenImage] = React.useState(null);
  React.useEffect(() => {
    if (openImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openImage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const handleAdd = async () => {
    setLoading(true);
    messageApi.open({
      type: "loading",
      content: "Adding to cart...",
      duration: 0,
    });
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice,
      onSale: product.onSale,
      quantity: 1,
      image: product.images[0],
      addedAt: Timestamp.now().toMillis(),
    };

    const userId = auth.currentUser?.uid;

    await addToCart({ cartItem, userId });
    setLoading(false);
    messageApi.destroy();
    messageApi.open({
      type: "success",
      content: "Added to cart successfully!",
      duration: 2,
    });
  };

  if (productStatus === "loading") {
    return (
      <div className='px-5 sm:px-15 md:px-25 lg:px-40 xl:px-50 py-4 bg-light-primary'>
        <ProductLoading />
      </div>
    );
  }

  if (!product) {
    return (
      <p className='text-center text-gray-500 py-10'>Product not found.</p>
    );
  }

  const { title, description, stock, images, category, price, rating, onSale } =
    product && product;
  const image = images && images;
  const discountedPrice = product.onSale ? product.discountedPrice : product.price;

  const offPercent = product.onSale ? Math.round(((price - discountedPrice) / price) * 100) : 0;


  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className='px-5 sm:px-10 md:px-15 lg:px-20 xl:px-30 py-4 bg-light-primary duration-200 ease-in '
    >
      {contextHolder}
      <BreadCrumb />
      {productStatus === "succeeded" && (
        <div className='w-full pb-10'>
          <div className='flex flex-col md:flex-row gap-4  '>
            <div className='flex flex-col lg:flex-row gap-2 sm:gap-4 md:gap-5 md:w-[70%] w-full mt-4 '>
              <div className='lg:w-3/4 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-lg overflow-hidden bg-[#F0F4F9]'>
                <div className="w-full h-full bg-dark-secondary relative">
                  <img
                    loading="lazy"
                    src={image}
                    onClick={() => setOpenImage(image)}
                    alt=''
                    className='w-full h-full object-cover rounded-lg bg-[#F0F4F9] object-blend-lighten aspect-video'
                  />
                  {onSale && (
                    <span className='absolute top-2 left-2 z-10 flex items-center gap-2 bg-light-primary text-white p-2 rounded-md text-sm font-semilight'>
                      <FaPercent size={20}  className='text-light-primary p-1 bg-white rounded-sm' />
                      <span>{offPercent}% Off</span>
                    </span>
                  )}
                </div>
              </div>
              {images && images.length > 1 && (
                <div className='lg:w-1/4 flex lg:flex-col  gap-2 sm:gap-4 md:gap-5'>
                  {images.map((img, index) => {
                    if (index === 0) return null;
                    return (
                      <motion.img
                        loading="lazy"
                        key={index}
                        src={img}
                        layoutId={img}
                        onClick={() => setOpenImage(img)}
                        alt=''
                        className='w-full lg:h-1/3 aspect-video object-cover shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-lg overflow-hidden bg-[#F0F4F9]'
                      />
                    );
                  })}
                </div>
              )}
              <motion.div>
                <AnimatePresence>
                  {openImage && (
                    <motion.div
                      className='fixed w-full h-screen inset-0 z-50 flex items-center justify-center bg-black/80 '
                      onClick={() => setOpenImage(null)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      exit={{ opacity: 0, }}
                    >
                      <motion.img
                        loading="lazy"
                        src={openImage}
                        alt=''
                        className='max-w-[70%] max-h-[70%] object-cover rounded-2xl overflow-hidden aspect-square'
                        layoutId={openImage}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            <div className='md:w-[30%] flex flex-col gap-2 '>
              <h1 className='text-xl xs:text-2xl font-semibold text-light-text mt-3'>
                {title}
              </h1>
              <p className='text-xs xs:text-sm text-justify text-light-text/30 my-1'>
                {description}
              </p>
              <p className='text-white/30 capitalize text-sm lg:text-md'>
                Category: {category}
              </p>
              <p className={`text-[24px] font-medium  mt-1`}>
                <span
                  className={`${onSale ? "line-through text-dark-text/50 font-normal" : "text-dark-text"
                    }`}
                >
                  ${price}
                </span>
                {onSale && (
                  <span className='ml-2 text-light-text'>${discountedPrice}</span>
                )}
              </p>
              <Rate count={5} value={rating} disabled />
              <div className='flex flex-wrap gap-x-8 gap-y-6 p-4  md:p-0 lg:py-4'>
                <div className='flex flex-col gap-2 '>
                  <p className='text-white text-4xl md:text-2xl lg:text-4xl font-black leading-tight tracking-[-0.033em]'>
                    4.5
                  </p>
                  <div className='flex gap-0.5'>
                    <div
                      className='text-white'
                      data-icon='Star'
                      data-size='18px'
                      data-weight='fill'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18px'
                        height='18px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                      </svg>
                    </div>
                    <div
                      className='text-white'
                      data-icon='Star'
                      data-size='18px'
                      data-weight='fill'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18px'
                        height='18px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                      </svg>
                    </div>
                    <div
                      className='text-white'
                      data-icon='Star'
                      data-size='18px'
                      data-weight='fill'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18px'
                        height='18px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                      </svg>
                    </div>
                    <div
                      className='text-white'
                      data-icon='Star'
                      data-size='18px'
                      data-weight='fill'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18px'
                        height='18px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                      </svg>
                    </div>
                    <div
                      className='text-white'
                      data-icon='Star'
                      data-size='18px'
                      data-weight='regular'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18px'
                        height='18px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z'></path>
                      </svg>
                    </div>
                  </div>
                  <p className='text-white text-base md:text-sm lg:text-base font-normal leading-normal'>
                    125 reviews
                  </p>
                </div>
                <div className='grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-3 md:gap-y-2 lg:ga-y-3'>
                  <p className='text-white text-sm font-normal leading-normal'>
                    5
                  </p>
                  <div className='flex h-2 flex-1 overflow-hidden rounded-md bg-[#3e3a55]'>
                    <div className='rounded-md bg-white'></div>
                  </div>
                  <p className='text-[#a09bbb] text-sm font-normal leading-normal text-right'>
                    40%
                  </p>
                  <p className='text-white text-sm font-normal leading-normal'>
                    4
                  </p>
                  <div className='flex h-2 flex-1 overflow-hidden rounded-md bg-[#3e3a55]'>
                    <div className='rounded-md bg-white'></div>
                  </div>
                  <p className='text-[#a09bbb] text-sm font-normal leading-normal text-right'>
                    30%
                  </p>
                  <p className='text-white text-sm font-normal leading-normal'>
                    3
                  </p>
                  <div className='flex h-2 flex-1 overflow-hidden rounded-md bg-[#3e3a55]'>
                    <div className='rounded-md bg-white'></div>
                  </div>
                  <p className='text-[#a09bbb] text-sm font-normal leading-normal text-right'>
                    15%
                  </p>
                  <p className='text-white text-sm font-normal leading-normal'>
                    2
                  </p>
                  <div className='flex h-2 flex-1 overflow-hidden rounded-md bg-[#3e3a55]'>
                    <div className='rounded-md bg-white'></div>
                  </div>
                  <p className='text-[#a09bbb] text-sm font-normal leading-normal text-right'>
                    10%
                  </p>
                  <p className='text-white text-sm font-normal leading-normal'>
                    1
                  </p>
                  <div className='flex h-2 flex-1 overflow-hidden rounded-md bg-[#3e3a55]'>
                    <div className='rounded-md bg-white'></div>
                  </div>
                  <p className='text-[#a09bbb] text-sm font-normal leading-normal text-right'>
                    5%
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  auth.currentUser
                    ? !InCart && handleAdd()
                    : navigate("/login");
                }}
                disabled={loading || InCart || stock === 0}
                className='mt-4 w-full bg-light-secondary text-dark-text py-2 rounded-lg cursor-pointer active:bg-dark-secondary active:text-dark-text hover:bg-dark-text hover:text-light-secondary  ease-in disabled:opacity-50 transition-all duration-200 disabled:bg-light-secondary disabled:text-light-text disabled:cursor-not-allowed'
              >
                <IoMdCart className='inline-block mr-2' />
                {loading ? "Adding..." : InCart ? "In Cart" : "Add to Cart"}
              </button>
            </div>
          </div>

          <div className='layout-content-container flex flex-col max-w-[920px] flex-1'>
            <h2 className='text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5'>
              Customer Reviews
            </h2>

            <div className='flex flex-col gap-8 overflow-x-hidden bg-[#121118] p-4'>
              <div className='flex flex-col gap-3 bg-[#121118]'>
                <div className='flex items-center gap-3'>
                  <div className='bg-center bg-no-repeat aspect-square bg-cover rounded-md size-10 overflow-hidden'>
                    <img
                      src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
                      alt=''
                    />
                  </div>
                  <div className='flex-1'>
                    <p className='text-white text-base font-medium leading-normal'>
                      Sophia Clark
                    </p>
                    <p className='text-[#a09bbb] text-sm font-normal leading-normal'>
                      1 month ago
                    </p>
                  </div>
                </div>
                <div className='flex gap-0.5'>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                </div>
                <p className='text-white text-base font-normal leading-normal'>
                  These headphones are amazing! The sound quality is top-notch,
                  and they're so comfortable to wear for long periods. Highly
                  recommend!
                </p>
                <div className='flex gap-9 text-[#a09bbb]'>
                  <button className='flex items-center gap-2'>
                    <div
                      className='text-inherit'
                      data-icon='ThumbsUp'
                      data-size='20px'
                      data-weight='regular'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20px'
                        height='20px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z'></path>
                      </svg>
                    </div>
                    <p className='text-inherit'>5</p>
                  </button>
                  <button className='flex items-center gap-2'>
                    <div
                      className='text-inherit'
                      data-icon='ThumbsDown'
                      data-size='20px'
                      data-weight='regular'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20px'
                        height='20px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z'></path>
                      </svg>
                    </div>
                    <p className='text-inherit'>1</p>
                  </button>
                </div>
              </div>
              <div className='flex flex-col gap-3 bg-[#121118]'>
                <div className='flex items-center gap-3'>
                  <div className='bg-center bg-no-repeat aspect-square bg-cover rounded-md size-10 overflow-hidden'>
                    <img
                      src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
                      alt=''
                    />
                  </div>
                  <div className='flex-1'>
                    <p className='text-white text-base font-medium leading-normal'>
                      Ethan Miller
                    </p>
                    <p className='text-[#a09bbb] text-sm font-normal leading-normal'>
                      2 months ago
                    </p>
                  </div>
                </div>
                <div className='flex gap-0.5'>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                  <div
                    className='text-[#595379]'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='regular'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z'></path>
                    </svg>
                  </div>
                </div>
                <p className='text-white text-base font-normal leading-normal'>
                  Great headphones for the price. The sound is clear, and the
                  battery life is impressive. Could use a bit more bass, but
                  overall, very satisfied.
                </p>
                <div className='flex gap-9 text-[#a09bbb]'>
                  <button className='flex items-center gap-2'>
                    <div
                      className='text-inherit'
                      data-icon='ThumbsUp'
                      data-size='20px'
                      data-weight='regular'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20px'
                        height='20px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z'></path>
                      </svg>
                    </div>
                    <p className='text-inherit'>3</p>
                  </button>
                  <button className='flex items-center gap-2'>
                    <div
                      className='text-inherit'
                      data-icon='ThumbsDown'
                      data-size='20px'
                      data-weight='regular'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20px'
                        height='20px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z'></path>
                      </svg>
                    </div>
                    <p className='text-inherit'>2</p>
                  </button>
                </div>
              </div>
              <div className='flex flex-col gap-3 bg-[#121118]'>
                <div className='flex items-center gap-3'>
                  <div className='bg-center bg-no-repeat aspect-square bg-cover rounded-md size-10 overflow-hidden'>
                    <img
                      src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
                      alt=''
                    />
                  </div>
                  <div className='flex-1'>
                    <p className='text-white text-base font-medium leading-normal'>
                      Olivia Davis
                    </p>
                    <p className='text-[#a09bbb] text-sm font-normal leading-normal'>
                      3 months ago
                    </p>
                  </div>
                </div>
                <div className='flex gap-0.5'>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                  <div
                    className='text-white'
                    data-icon='Star'
                    data-size='20px'
                    data-weight='fill'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20px'
                      height='20px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                    </svg>
                  </div>
                </div>
                <p className='text-white text-base font-normal leading-normal'>
                  Absolutely love these headphones! They're stylish, sound
                  fantastic, and the noise-canceling feature works like a charm.
                  Best purchase I've made in a while.
                </p>
                <div className='flex gap-9 text-[#a09bbb]'>
                  <button className='flex items-center gap-2'>
                    <div
                      className='text-inherit'
                      data-icon='ThumbsUp'
                      data-size='20px'
                      data-weight='regular'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20px'
                        height='20px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z'></path>
                      </svg>
                    </div>
                    <p className='text-inherit'>7</p>
                  </button>
                  <button className='flex items-center gap-2'>
                    <div
                      className='text-inherit'
                      data-icon='ThumbsDown'
                      data-size='20px'
                      data-weight='regular'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20px'
                        height='20px'
                        fill='currentColor'
                        viewBox='0 0 256 256'
                      >
                        <path d='M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z'></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className='flex px-4 py-3 justify-start'>
              <button className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#2a273a] text-white text-sm font-bold leading-normal tracking-[0.015em]'>
                <span className='truncate'>Write a Review</span>
              </button>
            </div>
            <h2 className='text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5'>
              Related Products
            </h2>
            <div className='flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden'>
              <div className='flex items-stretch p-4 gap-3'>
                {related &&
                  related.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/products/${item.id}`)}
                      className='cursor-pointer flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40 max-w-40 overflow-hidden'
                    >
                      <div className='w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col '>
                        <img
                          src={item.images[0]}
                          alt=''
                          className='h-full w-full object-cover'
                        />
                      </div>
                      <div>
                        <p className='text-white text-base font-medium leading-normal text-wrap'>
                          {item.title}
                        </p>
                        <p className='text-[#a09bbb] text-sm font-normal leading-normal text-nowrap overflow-ellipsis overflow-hidden'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Product;
