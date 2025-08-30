import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { useNavigate } from "react-router";
import { message, Spin } from "antd";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth } from "../Firebase/Firebase";
import { db } from "../Firebase/Firebase";
import { getUserOrders } from "./Features/UserSlice";


const CheckOutSummary = () => {
  const { cart, paymentInfo } = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOrder = async () => {
    if (cart.length > 0) {
      messageApi.destroy();
      setLoading(true);
      messageApi.open({
        type: "loading",
        content: "Placing your order...",
        duration: 0,
      });
      try {
        await updateDoc(doc(db, "orders", auth.currentUser.uid), {
          orders: arrayUnion({
            OrderId: Date.now(),
            Items: cart,
            status: "Preparing",
            placedAt: new Date().toISOString(),
            totalAmount: cart.reduce(
              (total, item) => total + item.price * item.quantity ,
              0
            ),
          }),
        });

        setModalOpen(false);

        dispatch(getUserOrders(auth.currentUser.uid));



        messageApi.destroy();
        messageApi.open({
          type: "success",
          content: "Order placed successfully",
          duration: 2,
        });
        setLoading(false);
      } catch (error) {
        messageApi.destroy();
        messageApi.open({
          type: "error",
          content: "Failed to place order",
          duration: 2,
        });
        setLoading(false);
      }
    } else {
      messageApi.destroy();
      messageApi.open({
        type: "info",
        content: "Your cart is empty",
        duration: 2,
      });
    }
  };

  return (
    <div className='mt-8'>
      {contextHolder}
      <h2 className='text-2xl font-medium text-light-text pb-6'>
        Order Summary
      </h2>

      <div
        onClick={() => setModalOpen(false)}
        className={`${
          modalOpen ? "block" : "hidden"
        } w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black/50 backdrop-blur-md px-5 overflow-hidden`}
      >
        <div onClick={(e) => e.stopPropagation()} className='bg-light-primary layout-content-container flex flex-col max-w-[512px] p-3  rounded-lg flex-1 shadow-md shadow-dark-secondary'>
          <div  className='flex flex-wrap justify-between gap-3 py-3 px-1'>
            <p className='text-white tracking-light text-lg font-semibold leading-tight min-w-72'>
              Saved Address
            </p>
          </div>
          <div className='flex items-center gap-4 bg-dark-secondary/20 rounded-md px-4 min-h-[72px] py-2 justify-between'>
            <div className='flex items-center gap-4'>
              <div className='flex flex-col justify-center'>
                <p className='text-white text-base font-medium leading-normal line-clamp-1'>
                  {paymentInfo && paymentInfo.address}
                </p>
                <p className='text-[#a09bbb] text-sm font-normal leading-normal line-clamp-2'>
                  {paymentInfo && paymentInfo.city},{" "}
                  {paymentInfo && paymentInfo.postalCode},{" "}
                  {paymentInfo && paymentInfo.country}
                </p>
              </div>
            </div>
            <div className='shrink-0'>
              <button
                disabled={loading}
                onClick={handleOrder}
                className='disabled:opacity-20 disabled:cursor-not-allowed flex  max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-3 bg-[#2a273a] text-white text-sm font-medium leading-normal w-fit'
              >
                <span className='inline-flex gap-2.5 items-center'>
                  {loading ? <Spin size='small' /> : ""}Proceed
                </span>
              </button>
            </div>
          </div>
          <div className='flex gap-3 py-3 justify-end'>
            <Button
              onClick={() => setModalOpen(false)}
              className={`w-full xxs:w-auto bg-light-secondary text-light-text hover:shadow-lg active:shadow active:bg-light-secondary`}
              label={
                <span className=' text-sm xs:text-md font-semibold'>
                  Cancel
                </span>
              }
            />
            <Button
              onClick={() => navigate("/user-profile/Checkout")}
              className={`w-full xxs:w-auto hover:shadow-lg active:shadow text-sm px-2`}
              label={
                <span className='text-sm xs:text-md font-semibold text-white'>
                  Create New Address
                </span>
              }
            />
          </div>
        </div>
      </div>

      <div className='flex gap-50 justify-between sm:justify-normal items-center border-t-2 border-light-text/20 py-3.5'>
        <p className='py-1 text-[14px] w-35 text-dark-text'>Items </p>
        <p className='text-[12px] text-light-text text-nowrap'>
          {"( "}
          {cart.length || 0}
          {" )"}
        </p>
      </div>

      <div className='flex gap-50 justify-between sm:justify-normal items-center border-t-2 border-light-text/20 py-3.5'>
        <p className='py-1 text-[14px] w-35 text-dark-text'>SubTotal </p>
        <p className='text-[12px] text-light-text text-nowrap'>
          $ {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
        </p>
      </div>

      <div className='flex gap-50 justify-between sm:justify-normal items-center border-t-2 border-light-text/20 py-3.5'>
        <p className='py-1 text-[14px] w-35 text-dark-text'>Shipping </p>
        <p className='text-[12px] text-light-text'>Free</p>
      </div>

      <div className='flex gap-50 justify-between sm:justify-normal items-center border-t-2 border-light-text/20 py-3.5'>
        <p className='py-1 text-[14px] w-35 text-dark-text'>Taxes </p>
        <p className='text-[12px] text-light-text text-nowrap'>
          ${" "}
          {(
            cart.reduce((acc, item) => acc + item.price * item.quantity, 0) *
            0.1
          ).toFixed(2)}
        </p>
      </div>

      <div className='flex gap-50 justify-between sm:justify-normal items-center border-t-2 border-light-text/20 py-3.5'>
        <p className='py-1 text-[14px] w-35 text-dark-text'>Discount </p>
        <p className='text-[12px] text-light-text text-nowrap'>
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
        <p className='text-md font-semibold text-light-text text-nowrap'>
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
      <div className='flex flex-col gap-2 xxs:flex-row items-center justify-between py-4'>
        <Button
          onClick={() => {
            cart.length > 0 ? paymentInfo
              ? setModalOpen(true)
              : navigate("/user-profile/checkout") : messageApi.open({
                type: "error",
                content: "Your cart is empty.",
              });
          }}
          className={`w-full xxs:w-auto hover:shadow-lg active:shadow text-sm`}
          label={
            <span className='text-sm xs:text-md font-semibold text-white'>
              Proceed to Payment
            </span>
          }
        />
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
    </div>
  );
};

export default CheckOutSummary;
