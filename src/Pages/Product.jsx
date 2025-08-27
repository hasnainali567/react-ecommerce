import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { LoadingCard, ProductLoading } from "../Components";
import { BreadCrumb } from "../Components";
import { Rate } from "antd";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const { products, productStatus } = useSelector((state) => state.products);

  const product = products && products.find((item) => item.id === productId);

  if (productStatus === "loading") {
    return (<div className='px-5 sm:px-15 md:px-25 lg:px-40 xl:px-50 py-4 bg-light-primary'>
      <ProductLoading />
    </div>);
  }

  if (!product) {
    return(
      <p className='text-center text-gray-500 py-10'>Product not found.</p>
    )
  }
  
  const { id, title, description, stock, images, rating } = product && product;
  const image = images && images;

  return (
    <div className='px-5 sm:px-15 md:px-25 lg:px-40 xl:px-50 py-4 bg-light-primary'>
      <BreadCrumb />
      {productStatus === "succeeded" && (
        <div className='w-full pb-10'>
          <div>
            <h1 className='text-xl xs:text-2xl font-semibold text-light-text mt-4'>
              {title}
            </h1>
            <p className='text-xs xs:text-sm text-light-text my-1'>
              {description}
            </p>
            <Rate value={rating} disabled />
          </div>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-5 w-full mt-4 '>
            <div className='sm:w-3/4 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-lg overflow-hidden bg-[#F0F4F9]'>
              <img
                src={image}
                alt=''
                className='w-full h-full object-cover rounded-lg bg-[#F0F4F9] object-blend-lighten'
              />
            </div>
            <div className='w-1/4 flex sm:flex-col gap-2 sm:gap-4 md:gap-5'>
              <img
                src={image}
                alt=''
                className='w-full shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-lg overflow-hidden bg-[#F0F4F9] rounded-lg bg-[#F0F4F9]'
              />
              <img
                src={image}
                alt=''
                className='w-full shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-lg overflow-hidden bg-[#F0F4F9] rounded-lg bg-[#F0F4F9]'
              />
              <img
                src={image}
                alt=''
                className='w-full shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-lg overflow-hidden bg-[#F0F4F9] rounded-lg bg-[#F0F4F9]'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
