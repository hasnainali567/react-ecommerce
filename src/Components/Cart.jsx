import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CheckOutSummary from "./CheckOutSummary";
import { useNavigate } from "react-router";
import Button from "./Button";

const Cart = () => {
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  return (
    <div>
      <h4 className='text-xl text-light-text font-semibold py-1.5 xxs:py-2'>
        Shopping Cart{" "}
      </h4>
      <div className='flex flex-col gap-4 py-3'>
        {user.cart?.length === 0 && (
          <div className='text-center text-light-text flex flex-col items-center gap-4 py-7'>
            Your cart is empty.
            <Button
              onClick={() => navigate("/products")}
              className={`w-full xxs:w-auto bg-light-secondary text-light-text hover:shadow-lg active:shadow active:bg-light-secondary`}
              label={
                <span className=' text-sm xs:text-md font-semibold'>
                  Continue Shopping
                </span>
              }
            />
          </div>
        )}
        {user?.cart.length > 0 && user?.cart?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CheckOutSummary />
    </div>
  );
};

export default Cart;
