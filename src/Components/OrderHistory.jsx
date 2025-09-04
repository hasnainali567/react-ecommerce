import React, { useState } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { deleteUserOrder, updateUserOrder } from "./Features/UserSlice";

const OrderHistory = () => {
  const { orders } = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const sortedOrders =
    orders &&
    orders.slice().sort((a, b) => new Date(b.OrderId) - new Date(a.OrderId));

  const [messageApi, contextHolder] = message.useMessage();
  const handleOrderCancel = async (orderId) => {
    const order = orders.find((o) => o.OrderId === orderId);
    if (order && order.status === "Preparing") {
      messageApi.open({
        type: "loading",
        content: "Canceling Order",
        duration: 0,
      });
      setLoading(true); // disable all

      try {
        await dispatch(
          updateUserOrder({
            orderId,
            updatedData: { status: "Cancelled" },
          })
        ).unwrap(); // <-- important (wait for actual success/error)

        messageApi.destroy();
        messageApi.open({ type: "success", content: "Order Cancelled" });
      } catch (err) {
        messageApi.destroy();
        messageApi.open({ type: "error", content: err.message });
      } finally {
        setLoading(false); // enable all back
      }
    } else {
      messageApi.open({ type: "error", content: "Cannot cancel this order" });
    }
  };

  const handleOrderDelete = async (orderId) => {
    messageApi.open({
      type: "loading",
      content: "Deleting Order",
      duration: 0,
    });
    setLoading(true); // disable all

    try {
      await dispatch(deleteUserOrder({ orderId })).unwrap();

      messageApi.destroy();
      messageApi.open({ type: "success", content: "Order Deleted" });
    } catch (err) {
      messageApi.destroy();
      messageApi.open({ type: "error", content: err.message });
    } finally {
      setLoading(false); // enable all back
    }
  };

  console.log(loading);
  

  return (
    <div className='flex flex-col gap-3'>
      {contextHolder}
      <h2 className='text-xl text-light-text font-semibold py-1.5 xxs:py-2'>
        Order History
      </h2>
      <div className='flex overflow-auto rounded-lg border border-[#3e3a55] bg-[#121118]'>
        <table className='w-full border-collapse overflow-auto'>
          <thead>
            <tr className='bg-[#1d1b27] text-white text-sm font-medium'>
              <th className='px-4 py-3 text-left w-[400px] text-nowrap'>
                Order Number
              </th>
              <th className='px-4 py-3 text-left w-[400px] text-nowrap'>
                Date Placed
              </th>
              <th className='px-4 py-3 text-left w-[400px] text-nowrap'>
                Total Amount
              </th>
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
            {sortedOrders &&
              sortedOrders.length > 0 &&
              sortedOrders.map((order) => (
                <tr className='border-t border-[#3e3a55]' key={order.OrderId}>
                  <td className='px-4 py-3'>{`#${
                    order && order?.OrderId.toFixed(0)
                  }`}</td>
                  <td className='px-4 py-3'>{order.placedAt.split("T")[0]}</td>
                  <td className='px-4 py-3'>${order.totalAmount.toFixed(2)}</td>
                  <td className='px-4 py-3'>
                    <button className='h-8 px-4 rounded-lg bg-[#2a273a] text-dark-text text-sm font-medium'>
                      {order.status}
                    </button>
                  </td>
                  <td className='px-4 py-3'>
                    {order.status === "Cancelled" ? (
                      <button
                        className={`font-medium bg-dark-text/80 p-2 w-20 rounded-md cursor-pointer text-dark-secondary hover:shadow-dark-text/10 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-35`}
                        onClick={() =>
                          order.status === "Cancelled" &&
                          handleOrderDelete(order.OrderId)
                        }
                        disabled={loading}
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        className={`font-medium bg-dark-secondary p-2 w-20 rounded-md cursor-pointer text-white hover:shadow-dark-text/10 hover:shadow-sm disabled:text-dark-secondary disabled:opacity-35 disabled:bg-dark-text disabled:cursor-not-allowed`}
                        onClick={() =>
                          order.status !== "Cancelled" &&
                          handleOrderCancel(order.OrderId)
                        }
                        disabled={order.status === "Cancelled" || loading}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
