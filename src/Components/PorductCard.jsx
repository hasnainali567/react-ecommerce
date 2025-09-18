import { Rate } from "antd";
import React, { useMemo, useState } from "react";
import { message } from "antd";
import { IoMdCart } from "react-icons/io";
import useUpdateCart from "../hooks/useUpdateCart.jsx";
import { useNavigate } from "react-router";
import { Timestamp } from "firebase/firestore";
import { auth } from "../Firebase/Firebase.js";
import { useSelector } from "react-redux";
import { FaHeart, FaPercent, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToFavorites } from "./Features/UserSlice.js";
const ProductCard = ({ product }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
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
  const [favLoading, setFavLoading] = useState(false);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user?.userInfo);
  const { cart, favorites } = userInfo || {};
  const InCart = useMemo(() => cart && cart.some((item) => item.id === product.id), [cart, product.id]);
  const inFavorites = useMemo(() => favorites && favorites.some((item) => item.id === product.id), [favorites, product.id]);


  if (!product) return null;

  const handleAdd = async () => {
    messageApi.open({
      type: "loading",
      content: "Adding to cart...",
      duration: 0,
    });
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
    messageApi.destroy();
    messageApi.open({ type: "success", content: "Added to cart!" });
  };

  const handleFavorite = async () => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    const userId = auth.currentUser.uid;

    const favoriteItem = {
      id: product.id,
      title: product.title,
      onSale: product.onSale,
      discountedPrice: product.onSale ? product.discountedPrice : 0,
      price: product.price,
      image: product.images[0],
      addedAt: Timestamp.now().toMillis(),
    };

    setFavLoading(true);
    messageApi.open({
      type: "loading",
      content: inFavorites ? "Removing from favorites..." : "Adding to favorites...",
      duration: 0,
    });

    await dispatch(addToFavorites({ userId, favoriteItem })).unwrap();
    setFavLoading(false);
    messageApi.destroy();
    messageApi.open({ type: "success", content: inFavorites ? "Removed from favorites!" : "Added to favorites!" });
  };

  const offPercent = onSale ? Math.round(((price - discountedPrice) / price) * 100) : 0;

  return (
    <div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`${!InCart &&
        " hover:scale-101 hover:translate-3d hover:translate-y-[-5px] hover:shadow-md hover:shadow-dark-secondary transition duration-200 ease-in"
        } shadow rounded-lg duration-100 ease-in cursor-pointer`}
    >
      {contextHolder}
      <div
        onClick={() => {
          navigate(`/products/${product.id}`);
        }}
        className='relative w-full rounded-t-lg overflow-hidden'
      >
        {onSale && (
          <span className='absolute top-2 left-2 z-10 flex items-center gap-2 bg-light-primary text-white p-1.5 rounded-md text-sm font-semilight'>
            <FaPercent size={18} className='text-light-primary p-1 bg-white rounded-sm' />
            <span>{offPercent}% Off</span>
          </span>
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
        <h3 className='text-lg font-semibold overflow-ellipsis text-nowrap overflow-hidden text-light-text'>
          {title}
        </h3>
        <Rate value={rating} allowHalf style={{ fontSize: "15px" }} disabled />
        <p className='text-dark-text text-sm overflow-ellipsis text-nowrap overflow-hidden'>
          {description}
        </p>
        <p className={`text-md  mt-1 `}>
          <span
            className={`${onSale ? "line-through text-dark-text/50" : "text-dark-text"
              }`}
          >
            ${price}
          </span>
          {onSale && (
            <span className='ml-2 text-light-text text-[18px]'>${discountedPrice}</span>
          )}
        </p>
        <p className='text-sm text-dark-text my-1'>
          {stock ? `${stock} in Stock` : `Out of Stock`}
        </p>

        <div className='flex items-center gap-2'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              auth.currentUser ? !InCart && handleAdd() : navigate("/login");
            }}
            disabled={loading || InCart || stock === 0}
            className='flex-1 bg-light-secondary text-dark-text py-2 rounded-lg cursor-pointer active:bg-dark-secondary active:text-dark-text hover:bg-dark-text hover:text-light-secondary  ease-in disabled:opacity-50 transition-all duration-200 disabled:bg-light-secondary disabled:text-light-text disabled:cursor-not-allowed'
          >
            <IoMdCart className='inline-block mr-2' />
            {loading ? "Adding..." : InCart ? "In Cart" : "Add to Cart"}
          </button>
          <button
            disabled={favLoading}
            onClick={(e) => { e.stopPropagation(); handleFavorite() }}
            className="p-2.5 cursor-pointer bg-light-secondary text-dark-text rounded-lg hover:bg-dark-text hover:text-light-primary active:bg-dark-text active:text-light-secondary transition-all duration-200"
          >
            {inFavorites ? (
              <FaHeart size={20} />
            ) : (
              <FaRegHeart size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
