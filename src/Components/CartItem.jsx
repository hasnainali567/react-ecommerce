import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCart, updateCartQuantity } from "./Features/UserSlice";
import { auth } from "../Firebase/Firebase";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Spin } from "antd";
import {} from "@ant-design/icons";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(item.quantity);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (quantity !== item.quantity) {
        console.log("quantity Updating...", quantity);
        await dispatch(updateCartQuantity({ cartId: item.id, quantity }));
        console.log("quantity updated");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [quantity]);

  const handleDel = async () => {
    console.log("handleDel");
    setLoading(true);
    const userId = auth.currentUser.uid;
    await dispatch(deleteCart({ delItem: item, userId }));
    setLoading(false);
  };

  return (
    <div className='flex flex-col xxs:flex-row xxs:items-center justify-between rounded-lg  bg-dark-secondary xxs:bg-light-primary cursor-pointer overflow-hidden'>
      <img
        src={item.image}
        alt={item.title}
        className='xxs:w-22 xxs:h-22 object-cover rounded-t-md xxs:rounded-md overflow-hidden aspect-video xxs:aspect-square'
      />
      <div className='flex-1 flex flex-col xxs:mx-4 p-2 xxs:p-0 overflow-hidden '>
        <h3 className='text-lg overflow-ellipsis text-nowrap overflow-hidden text-light-text font-semibold'>
          {item.title}
        </h3>
        <p className='text-sm text-gray-500'>
          {item.onSale && <span className='line-through'>${item.price}</span>}{" "}
          {item.onSale ? (
            <span className='text-dark-text'>${item.discountedPrice}</span>
          ) : (
            `$${item.price}`
          )}
        </p>
        <div className='text-sm text-dark-text flex items-center justify-between mt-1'>
          Quantity: {quantity}
          <div className='flex flex-1 xxs:hidden max-w-25 xxs:max-w-28 items-center justify-between '>
            <button
              className='p-2.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-full bg-light-primary xxs:bg-dark-secondary'
              onClick={() =>
                quantity > 1 ? setQuantity(quantity - 1) : handleDel()
              }
              disabled={loading}
            >
              <FaMinus size={10} style={{ color: "#767990" }} />
            </button>
            {loading ? (
              <div className='py-1 px-2 text-light-text text-sm'>
                <Spin size='small' className='!text-light-text' />
              </div>
            ) : (
              <input
                type='number'
                value={quantity}
                min='1'
                className='w-10 py-1  text-center text-light-text text-sm ps-2.5  outline-none flex content-center cursor-not-allowed'
                readOnly
                name='quantity'
              />
            )}
            <button
              className='p-2.5 rounded-full bg-light-primary xxs:bg-dark-secondary cursor-pointer text-light-text disabled:cursor-not-allowed disabled:opacity-50'
              onClick={() => setQuantity(quantity + 1)}
              disabled={loading}
            >
              <FaPlus size={10} />
            </button>
          </div>
        </div>
      </div>
      <div className='hidden xxs:flex xxs:flex-col gap-2 p-2 xxs:mt-0 bg-dark-secondary xxs:bg-light-primary '>
        <div className='flex flex-1 max-w-25 xxs:max-w-28 items-center justify-between '>
          <button
            className='p-2.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-full bg-light-primary xxs:bg-dark-secondary'
            onClick={() =>
              quantity > 1 ? setQuantity(quantity - 1) : handleDel()
            }
            disabled={loading}
          >
            <FaMinus size={10} style={{ color: "#767990" }} />
          </button>
          {loading ? (
            <div className='py-1 px-2 text-light-text text-sm'>
              <Spin size='small' className='!text-light-text' />
            </div>
          ) : (
            <input
              type='number'
              value={quantity}
              min='1'
              className='w-10 py-1  text-center text-light-text text-sm ps-2.5  outline-none flex content-center cursor-not-allowed'
              readOnly
              name='quantity'
            />
          )}
          <button
            className='p-2.5 rounded-full bg-light-primary xxs:bg-dark-secondary cursor-pointer text-light-text disabled:cursor-not-allowed disabled:opacity-50'
            onClick={() => setQuantity(quantity + 1)}
            disabled={loading}
          >
            <FaPlus size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
