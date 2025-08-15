import React from "react";
import { BreadCrumb } from "../Components";
import { ProductPagination } from '../Components';
const Products = () => {

  return (
    <div className="w-full px-10 md:px-20 lg:px-30 xl:px-40 py-6  flex flex-col gap-6">
      <BreadCrumb />
      <h1 className='text-3xl font-semibold text-light-text'>All Products</h1>

      <ProductPagination />
    </div>
  );
};

export default Products;
