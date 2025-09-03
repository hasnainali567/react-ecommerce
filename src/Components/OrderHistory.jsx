
import React from "react";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const orders = useSelector((state) => state.user.userInfo.orders);

  const sortedOrders = orders && orders.slice().sort((a, b) => new Date(b.OrderId) - new Date(a.OrderId));


  console.log(sortedOrders);
  
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl text-light-text font-semibold py-1.5 xxs:py-2">Order History</h2>
      <div className='flex overflow-auto rounded-lg border border-[#3e3a55] bg-[#121118]'>
        <table className='w-full border-collapse overflow-auto'>
          <thead>
            <tr className='bg-[#1d1b27] text-white text-sm font-medium'>
              <th className='px-4 py-3 text-left w-[400px] text-nowrap'>Order Number</th>
              <th className='px-4 py-3 text-left w-[400px] text-nowrap'>Date Placed</th>
              <th className='px-4 py-3 text-left w-[400px] text-nowrap'>Total Amount</th>
              <th className='px-4 py-3 text-left w-60'>Status</th>
              <th className='px-4 py-3 text-left w-60'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-[#a09bbb] text-sm'>
            {orders && orders.length === 0 && (
              <tr className='border-t border-[#3e3a55]'>
                <td className='px-4 py-3' colSpan={5}>
                  No orders found.
                </td>
              </tr>
            )}
            {sortedOrders && sortedOrders.length > 0 && sortedOrders.map((order, index) => (
              <tr className='border-t border-[#3e3a55]' key={order.OrderId}>
              <td className='px-4 py-3'>{`#${order && order?.OrderId.toFixed(0)}`}</td>
              <td className='px-4 py-3'>{order.placedAt.split("T")[0]}</td>
              <td className='px-4 py-3'>${order.totalAmount.toFixed(2)}</td>
              <td className='px-4 py-3'>
                <button className='h-8 px-4 rounded-lg bg-[#2a273a] text-white text-sm font-medium'>
                  {order.status }
                </button>
              </td>
              <td className='px-4 py-3 font-bold'>Cancel</td>
            </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
