import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { LoadingCard } from "../Components";
import {BreadCrumb} from "../Components";
import { Rate } from "antd";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const { products, productStatus } = useSelector((state) => state.products);

  const product = products && products.find((item) => item.id === productId);

  const {id, title, description, stock, images, rating} = product && product;
  const image = images && images;

  return (
    <div className="px-5 sm:px-15 md:px-25 lg:px-40 xl:px-50 py-4">
      <BreadCrumb />
          {productStatus === 'loading' ? (
            <LoadingCard />
          ) : (
            <div
            className="w-full"
            >
              <div>
                <h1 className="text-xl xs:text-2xl font-semibold text-light-text mt-4">{title}</h1>
                <p className="text-xs xs:text-sm text-light-text my-1">{description}</p>
                <Rate value={rating} disabled  />
              </div>
              <img src={image} className=" aspect-square sm:aspect-video object-cover w-full  mt-2 rounded-2xl" ></img>
            </div>
          )}
    </div>
  );
};

export default Product;
