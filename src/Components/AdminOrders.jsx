import { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllOrders } from "./Features/UserSlice";

const AdminOrders = ({ menu, setMenu }) => {
  const allOrders = useSelector((state) => state.user.userInfo.allOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allOrders) {
      dispatch(getAllOrders());
    }
  }, [dispatch, allOrders]);

  const flattenedOrders =
    allOrders &&
    allOrders?.flatMap((orderDoc) =>
      orderDoc.orders.map((singleOrder) => ({
        ...singleOrder,
        orderId: orderDoc.OrderId,
        userId: orderDoc.userId,
        costumerName: orderDoc.paymentInfo.fullName,
      }))
    );
    

  return (
    <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
      <div className='flex flex-wrap items-center  gap-2 p-2 px-0 md:p-4'>
        <div onClick={() => setMenu(!menu)} className='md:hidden'>
          <FaBars size={24} className='text-white' />
        </div>
        <p className='text-white text-2xl md:text-3xl font-bold leading-tight '>
          Orders
        </p>
      </div>
      <div className='p-2 px-0 md:px-4 '>
        <label className='flex flex-col h-12 w-full'>
          <div className='flex w-full flex-1 rounded-lg h-full'>
            <div
              className='text-[#a09bbb] flex border-none bg-[#2a273a] items-center justify-center pl-4 rounded-l-lg border-r-0'
              data-icon='MagnifyingGlass'
              data-size='24px'
              data-weight='regular'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24px'
                height='24px'
                fill='currentColor'
                viewBox='0 0 256 256'
              >
                <path d='M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z'></path>
              </svg>
            </div>
            <input
              placeholder='Search by Order ID or Customer Name'
              className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#2a273a] focus:border-none h-full placeholder:text-[#a09bbb] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal'
            />
          </div>
        </label>
      </div>
      <div className='flex gap-3 p-2 px-0 md:px-4 py-3 flex-wrap '>
        <button className='flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#2a273a] p-4'>
          <p className='text-white text-sm font-medium leading-normal'>All</p>
        </button>
        <button className='flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#2a273a] p-4'>
          <p className='text-white text-sm font-medium leading-normal'>
            Pending
          </p>
        </button>
        <button className='flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#2a273a] p-4'>
          <p className='text-white text-sm font-medium leading-normal'>Paid</p>
        </button>
        <button className='flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#2a273a] p-4'>
          <p className='text-white text-sm font-medium leading-normal '>
            Shipped
          </p>
        </button>
        <button className='flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#2a273a] p-4'>
          <p className='text-white text-sm font-medium leading-normal'>
            Cancelled
          </p>
        </button>
      </div>
      <div className='md:px-4 py-3 @container'>
        <div className='flex overflow-auto max-h-150  rounded-lg border border-[#3e3a55] bg-[#121118] scroll-bar'>
          <table className='flex-1 max-h-100'>
            <thead className='sticky top-0'>
              <tr className='bg-[#1d1b27]'>
                <th className='text-nowrap table-ae896546-8418-4ced-b5d7-85535fe87205-column-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal'>
                  Order Id
                </th>
                <th className='text-nowrap table-ae896546-8418-4ced-b5d7-85535fe87205-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal'>
                  Costumer Name
                </th>
                <th className='text-nowrap table-ae896546-8418-4ced-b5d7-85535fe87205-column-360 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal'>
                  Total Amount
                </th>
                <th className='text-nowrap table-ae896546-8418-4ced-b5d7-85535fe87205-column-480 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal'>
                  Status
                </th>
                <th className='text-nowrap table-ae896546-8418-4ced-b5d7-85535fe87205-column-600 px-4 py-3 text-left w-60 text-[#a09bbb] text-sm font-medium leading-normal'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='overflow-auto max-h-200'>
              {flattenedOrders &&
                flattenedOrders.length > 0 &&
                flattenedOrders.map((order) => (
                  <tr className='border-t border-t-[#3e3a55]'>
                    <td className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal'>
                      #{order.OrderId}
                    </td>
                    <td className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-240 h-[72px] px-4 py-2 w-[400px] text-[#a09bbb] text-sm font-normal leading-normal'>
                      {order.costumerName}
                    </td>
                    <td className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-360 h-[72px] px-4 py-2 w-[400px] text-[#a09bbb] text-sm font-normal leading-normal'>
                      ${order.totalAmount}
                    </td>
                    <td className='table-4c58aa3e-9208-4123-a86a-46a533327e13-column-480 h-[72px] px-4 py-2 text-sm font-normal leading-normal'>
                      <button className='max-w-fit cursor-pointer rounded-lg h-8 px-4 bg-[#2a273a] text-white text-sm font-medium leading-normal w-full'>
                        <span className='truncate'>{order.status}</span>
                      </button>
                    </td>
                    <td className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-600 h-[72px] px-4 py-2 w-60 text-[#a09bbb] text-sm font-bold leading-normal tracking-[0.015em]'>
                      Update
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
