import Item from "antd/es/list/Item";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import { useNavigate } from "react-router";

const CheckOutSummary = () => {
  const cart = useSelector((state) => state.user.userInfo?.cart);
  const navigate = useNavigate();


  return (
    <div className='mt-4'>
      <h2 className='text-2xl font-medium text-light-text pb-4'>
        Order Summary
      </h2>
      <div className='h-[1.5px] bg-light-text/20 my-2'></div>
      <div className='flex gap-50 justify-between sm:justify-normal items-center'>
        <p className='py-1 text-[14px] w-35 text-dark-text'>Items </p>
        <p className='text-[12px] text-light-text'>
          {"( "}
          {cart.length || 0}
          {" )"}
        </p>
      </div>
      <div className='h-[1.5px] bg-light-text/20 my-2'></div>
      <div className='flex gap-50 justify-between sm:justify-normal items-center'>
        <p className='py-1 text-[14px] w-35 text-dark-text'>SubTotal </p>
        <p className='text-[12px] text-light-text'>
          $ {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
        </p>
      </div>
      <div className='h-[1.5px] bg-light-text/20 my-2'></div>
      <div className='flex gap-50 justify-between sm:justify-normal items-center'>
        <p className='py-1 text-[14px] w-35 text-dark-text'>Shipping </p>
        <p className='text-[12px] text-light-text'>Free</p>
      </div>
      <div className='h-[1.5px] bg-light-text/20 my-2'></div>
      <div className='flex gap-50 justify-between sm:justify-normal items-center'>
        <p className='py-1 text-[14px] w-35 text-dark-text'>Taxes </p>
        <p className='text-[12px] text-light-text'>
          ${" "}
          {(
            cart.reduce((acc, item) => acc + item.price * item.quantity, 0) *
            0.1
          ).toFixed(2)}
        </p>
      </div>
      <div className='h-[1.5px] bg-light-text/20 my-2'></div>
      <div className='flex gap-50 justify-between sm:justify-normal items-center'>
        <p className='py-1 text-[14px] w-35 text-dark-text'>Discount </p>
        <p className='text-[12px] text-light-text'>
          - $
          {(
            cart.reduce(
              (acc, item) => acc + item.discountedPrice * item.quantity,
              0
            ) * 0.1
          ).toFixed(2)}
        </p>
      </div>

      <div className='flex gap-50 justify-between sm:justify-normal items-center pt-10'>
        <p className='py-1 text-lg font-semibold w-35 text-light-text'>
          Total{" "}
        </p>
        <p className='text-md font-semibold text-light-text'>
          ${" "}
          {(
            cart.reduce((acc, item) => acc + item.price * item.quantity, 0) *
            1.1
          ).toFixed(2) -
            (
              cart.reduce(
                (acc, item) => acc + item.discountedPrice * item.quantity,
                0
              ) * 0.1
            ).toFixed(2)}
        </p>
      </div>
      <div className='flex items-center justify-between py-4'>
        <Button
          className={` hover:shadow-lg active:shadow`}
          label={
            <span className='text-md font-semibold text-white'>
              Proceed to Payment
            </span>
          }
        />
        <Button
          onClick={() => navigate("/products")}
          className={`bg-light-secondary text-light-text hover:shadow-lg active:shadow active:bg-light-secondary`}
          label={
            <span className='text-md font-semibold'>Continue Shopping</span>
          }
        />
      </div>
    </div>
  );
};

export default CheckOutSummary;
