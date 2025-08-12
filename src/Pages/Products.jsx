import React from "react";
import { useSelector } from "react-redux";
import { ProductCard, BreadCrumb } from "../Components";
import { Link } from "react-router";
import { ProductPagination } from '../Components';
const Products = () => {
  const products = useSelector((state) => state.products.products);

  return (
    <div className="w-full px-10 md:px-20 lg:px-30 xl:px-40 py-6  flex flex-col gap-6">
      <BreadCrumb />
      <h1 className='text-3xl font-semibold text-light-text'>All Products</h1>

      <ProductPagination />
    </div>
  );
};

export default Products;
