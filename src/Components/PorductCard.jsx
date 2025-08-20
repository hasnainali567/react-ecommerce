import { Rate } from "antd";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import useUpdateCart from "../hooks/useUpdateCart.jsx";
import { useNavigate } from "react-router";
import { Timestamp } from "firebase/firestore";
import { auth } from "../Firebase/Firebase.js";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
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
  const [qty, setQty] = useState(1);
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
      quantity: qty,
      image: product.images[0],
      addedAt: Timestamp.now().toMillis(),
    };

    const userId = auth.currentUser?.uid;

    await addToCart({ cartItem, userId });
    setLoading(false);
  };

  return (
    <motion.div
      layoutId={`main-${product.id}`}
      className='hover:scale-101 hover:translate-3d hover:translate-y-[-5px] hover:shadow-xl shadow rounded-lg duration-100 ease-in cursor-pointer'
    >
      <div
        onClick={() => {
          navigate(`/products/${product.id}`);
        }}
        className='relative w-full rounded-t-lg overflow-hidden'
      >
        <motion.div
          layoutId={`sale-label-${product.id}`}
          onClick={() => {
            navigate(`/products/${product.id}`);
          }}
          className={`absolute top-2.5 left-2.5 bg-light-text/90 text-light-secondary px-2 py-1 rounded shadow cursor-default`}
          disabled
        >
          On Sale
        </motion.div>
        <motion.img
          layoutId={`img-${product.id}`}
          src={image || "https://via.placeholder.com/150"}
          alt='product image'
          className='aspect-square object-cover h-full w-full'
        />
      </div>
      <motion.div
        layoutId={`content-${product.id}`}
        onClick={() => {
          navigate(`/products/${product.id}`);
        }}
        className='p-3'
      >
        <motion.h3 
        layoutId={`title-${product.id}`}
        className='text-lg font-semibold overflow-ellipsis text-nowrap overflow-hidden'>
          {title}
        </motion.h3>
        <Rate
          value={rating} allowHalf style={{ fontSize: "15px" }} disabled />
        <motion.p 
        layoutId={`description-${product.id}`}
        className='text-gray-600 text-sm overflow-ellipsis text-nowrap overflow-hidden'>
          {description}
        </motion.p>
        <p 
        className={`text-md  mt-1 `}>
          <span className={`${onSale ? "line-through text-light-text" : ""}`}>
            ${price}
          </span>
          {onSale && <span className='ml-2'>${discountedPrice}</span>}
        </p>
        <p 
        className='text-sm text-gray-500 mt-1'>
          {stock ? `${stock} in Stock` : `Out of Stock`}
        </p>
        <div
          className='flex justify-between items-center gap-5 mt-2'>
          <p
            onClick={() => {
              navigate(`/products/${product.id}`);
            }}
            className='text-sm text-gray-500 m-0'
          >
            Quantity(Peices)
          </p>
          <div
            className='flex flex-1 max-w-50 items-center justify-between border text-light-text border-black/10 rounded bg-light-secondary'>
            <button
              onClick={() => qty > 1 && setQty(qty - 1)}
              className='px-2.5 cursor-pointer'
            >
              <FaMinus />
            </button>
            <input
              type='number'
              min='1'
              value={qty}
              className='w-10 py-1 text-center xl:ps-2.5 [appearance:textfield] border-x-2 border-black/10 outline-none flex-1 cursor-not-allowed'
              readOnly
            />
            <button
              onClick={() => setQty(qty + 1)}
              className='px-2.5 py-2 cursor-pointer'
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <motion.button
          layoutId={`add-to-cart-${product.id}`}
          onClick={(e) => {
            e.stopPropagation()
            !InCart && handleAdd()}}
          disabled={loading || InCart || stock === 0}
          className='mt-4 w-full bg-light-secondary text-light-text py-2 rounded-lg cursor-pointer active:bg-light-text active:text-white hover:bg-light-text hover:text-light-secondary  ease-in disabled:opacity-50 transition-all duration-200 disabled:bg-light-secondary disabled:text-light-text disabled:cursor-not-allowed'
        >
          <IoMdCart className='inline-block mr-2' />
          {loading ? "Adding..." : InCart ? "In Cart" : "Add to Cart"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
