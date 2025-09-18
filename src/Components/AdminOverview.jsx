import React, { useEffect, useMemo } from "react";
import { FaBars } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "./Features/UserSlice";


const AdminOverview = ({menu, setMenu}) => {
  const allOrders = useSelector((state) => state.user.userInfo.allOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allOrders) {
      dispatch(getAllOrders());
    }
  }, [dispatch, allOrders]);

  const total = useMemo(() => {
    if (!allOrders) return 0;
    const orders = allOrders.flatMap(user => user.orders || []);
    return orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
  }, [allOrders]);

  const order = useMemo(() => {
    if (!allOrders) return 0;
    const orders = allOrders.flatMap(user => user.orders || []);
    return orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
  }, [allOrders]);

  console.log(total );
  
  return (
    <div className='flex-1 max-w-[960px]'>
      <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
        <div className='flex flex-wrap items-center  gap-2 p-2 px-0 md:p-4'>
          <div onClick={() => setMenu(!menu)} className='md:hidden'>
            <FaBars size={24} className='text-white' />
          </div>
          <p className='text-white text-2xl md:text-3xl font-bold leading-tight '>
            Overview
          </p>
        </div>
        <div className='flex flex-wrap gap-4 p-2 px-0 md:p-4'>
          <div className='flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#2a273a]'>
            <p className='text-white text-base font-medium leading-normal'>
              Total Sales
            </p>
            <p className='text-white tracking-light text-2xl font-bold leading-tight'>
              ${total.toFixed(2)}
            </p>
            <p className='text-[#0bda6c] text-base font-medium leading-normal'>
              +10%
            </p>
          </div>
          <div className='flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#2a273a]'>
            <p className='text-white text-base font-medium leading-normal'>
              Orders
            </p>
            <p className='text-white tracking-light text-2xl font-bold leading-tight'>
              150
            </p>
            <p className='text-[#0bda6c] text-base font-medium leading-normal'>
              +5%
            </p>
          </div>
          <div className='flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#2a273a]'>
            <p className='text-white text-base font-medium leading-normal'>
              Active Products
            </p>
            <p className='text-white tracking-light text-2xl font-bold leading-tight'>
              75
            </p>
            <p className='text-[#fa6938] text-base font-medium leading-normal'>
              -2%
            </p>
          </div>
          <div className='flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#2a273a]'>
            <p className='text-white text-base font-medium leading-normal'>
              Low Stock
            </p>
            <p className='text-white tracking-light text-2xl font-bold leading-tight'>
              10
            </p>
            <p className='text-[#fa6938] text-base font-medium leading-normal'>
              -1%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
