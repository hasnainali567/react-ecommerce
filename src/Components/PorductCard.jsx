import { Rate } from "antd";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import useUpdateCart from "../hooks/useUpdateCart.jsx";
import { useNavigate } from "react-router";
import { Timestamp } from "firebase/firestore";
import { auth } from "../Firebase/Firebase.js";
import { useSelector } from "react-redux";
const ProductCard = ({ product }) => {
  const {
    title,
    description,
    rating,
    stock,
    price,
    images,
    onSale,
    discountedPrice,
  } = product;
  const [image] = images;
  const { addToCart } = useUpdateCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.user.userInfo?.cart);
  const InCart = cart && cart.some((item) => item.id === product.id);

  if (!product) return null;

  const handleAdd = async () => {
    setLoading(true);
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
  };

  return (
    <div
    initial={{opacity: 0, y: -20}}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      
      className={`${!InCart && ' hover:scale-101 hover:translate-3d hover:translate-y-[-5px] hover:shadow-xl'} shadow rounded-lg duration-100 ease-in cursor-pointer`}
    >
      <div
        onClick={() => {
          navigate(`/products/${product.id}`);
        }}
        className='relative w-full rounded-t-lg overflow-hidden'
      >
        {onSale && (
          <div
          
          onClick={() => {
            navigate(`/products/${product.id}`);
          }}
          className={`absolute top-2.5 left-2.5 bg-dark-secondary  text-dark-text px-2 py-1 rounded shadow cursor-default`}
          disabled
        >
          On Sale
        </div>
        )}
        <img
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          
          src={image || "https://via.placeholder.com/150"}
          alt='product image'
          className='aspect-square object-cover h-full w-full'
        />
      </div>
      <div
        onClick={() => {
          navigate(`/products/${product.id}`);
        }}
        className='p-3 bg-dark-secondary rounded-b-lg'
      >
        <h3
          className='text-lg font-semibold overflow-ellipsis text-nowrap overflow-hidden text-light-text'
        >
          {title}
        </h3>
        <Rate value={rating} allowHalf style={{ fontSize: "15px" }} disabled />
        <p
          className='text-dark-text text-sm overflow-ellipsis text-nowrap overflow-hidden'
        >
          {description}
        </p>
        <p className={`text-md  mt-1 `}>
          <span className={`${onSale ? "line-through text-dark-text/50" : ""}`}>
            ${price}
          </span>
          {onSale && <span className='ml-2 text-light-text'>${discountedPrice}</span>}
        </p>
        <p className='text-sm text-dark-text mt-1'>
          {stock ? `${stock} in Stock` : `Out of Stock`}
        </p>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            auth.currentUser ? !InCart && handleAdd() : navigate('/login');
          }}
          disabled={loading || InCart || stock === 0}
          className='mt-4 w-full bg-light-secondary text-dark-text py-2 rounded-lg cursor-pointer active:bg-dark-secondary active:text-dark-text hover:bg-dark-text hover:text-light-secondary  ease-in disabled:opacity-50 transition-all duration-200 disabled:bg-light-secondary disabled:text-light-text disabled:cursor-not-allowed'
        >
          <IoMdCart className='inline-block mr-2' />
          {loading ? "Adding..." : InCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
