import { Rate } from "antd";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import useUpdateCart from "../hooks/useUpdateCart.jsx";
import { Timestamp } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { getUserDoc } from "./Features/UserSlice.js";
import { auth } from "../Firebase/Firebase.js";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { addToCart } = useUpdateCart();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

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

    await addToCart({cartItem, userId});
    setLoading(false);
  };

  return (
    <div className=' shadow-lg  rounded-lg'>
      <div className='w-full rounded-t-lg overflow-hidden'>
        <img
          src={product?.images[0] || "https://via.placeholder.com/150"}
          alt=''
          className='aspect-square object-cover h-full w-full'
        />
      </div>
      <div className='p-3'>
        <h3 className='text-lg font-semibold overflow-ellipsis text-nowrap overflow-hidden'>
          {product.title}
        </h3>
        <Rate defaultValue={4} style={{ fontSize: "15px" }} disabled />
        <p className='text-gray-600 text-sm overflow-ellipsis text-nowrap overflow-hidden'>
          {product.description}
        </p>
        <p>${product.price}</p>
        <p className='text-sm text-gray-500 mt-1'>
          {product.stock > 0 ? `${product.stock} In Stock` : `Out of Stock`}
        </p>
        <div className='flex justify-between items-center gap-5 mt-2'>
          <p className='text-sm text-gray-500 m-0'>Quantity(Peices)</p>
          <div className='flex flex-1 items-center justify-between border border-black/10 rounded bg-light-secondary'>
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
              className='w-10 py-1 text-center [appearance:textfield] border-x-2 border-black/10 outline-none flex-1 ps-3 cursor-not-allowed'
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
        <button
          onClick={() => handleAdd()}
          disabled={loading}
          className='mt-4 w-full bg-light-secondary text-light-text py-2 rounded-lg cursor-pointer active:bg-light-text active:text-white hover:shadow-md disabled:opacity-50 transition-all duration-200 disabled:shadow-none'
        >
          <IoMdCart className='inline-block mr-2' />
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
