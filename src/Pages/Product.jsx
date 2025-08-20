import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Rate } from "antd";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import useUpdateCart from "../hooks/useUpdateCart.jsx";
import { useNavigate } from "react-router";
import { Timestamp } from "firebase/firestore";
import { auth } from "../Firebase/Firebase.js";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/").pop();
  console.log(productId);

  const { products, productStatus } = useSelector((state) => state.products);

  const product = products.find((p) => p.id === productId);

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
      className='w-full h-full px-5 sm:px-15 md:px-30 lg:px-40 xl:px-50 py-6 flex flex-col gap-2.5 sm:gap-4 md:gap-6'
    >
      <motion.div layoutId={`content-${product.id}`}>
        <motion.h3
          layoutId={`title-${product.id}`}
          className='text-4xl mb-1 font-semibold overflow-ellipsis text-nowrap overflow-hidden text-light-text'
        >
          {title}
        </motion.h3>
        <Rate
          layoutId={`rate-${product.id}`}
          value={rating}
          allowHalf
          style={{ fontSize: "18px" }}
          disabled
        />
        <motion.p
          layoutId={`description-${product.id}`}
          className='text-gray-600 text-sm overflow-ellipsis text-nowrap overflow-hidden mt-1'
        >
          {description}
        </motion.p>
      </motion.div>
      <motion.div
        layoutId={`image-wrapper-${product.id}`}
        className='relative w-full rounded-t-lg overflow-hidden'
      >
        <motion.img src={image} alt={title} className='w-full h-150 object-cover object-center rounded-2xl' />
      </motion.div>
      <motion.button layoutId={`add-to-cart-${product.id}`} className="mt-4 w-full text-xl bg-light-secondary text-light-text py-2.5 max-w-150 mx-auto rounded-lg cursor-pointer active:bg-light-text active:text-white hover:bg-light-text hover:text-light-secondary  ease-in disabled:opacity-50 transition-all duration-200 disabled:bg-light-secondary disabled:text-light-text disabled:cursor-not-allowed">
        <IoMdCart className='inline-block mr-2 text-xl' />
        Add to Cart
      </motion.button>
    </motion.div>
  );
};

export default Product;
