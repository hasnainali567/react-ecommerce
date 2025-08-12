import React from "react";
import { Link } from "react-router";

const CategoryBadge = ({ text, cat }) => {
  return (
    <Link to={`./products${cat !== 'allproducts' ? `/${cat}` : ''}`}>
      <span className='bg-light-secondary text-light-text text-sm px-4 py-1.5 rounded cursor-pointer'>
        {text}
      </span>
    </Link>
  );
};

export default CategoryBadge;
