import { message } from "antd";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "./Features/UserSlice";

const PaymentForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const user = useSelector((state)=> state.user.userInfo);
  const dispatch = useDispatch();

  const handlePayment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // Validate all fields are filled
    // 
    for (const [key, value] of Object.entries(data)) {
      if (!value || typeof value !== "string" || !value.trim()) {
        messageApi.destroy()
        messageApi.open({
          type: "error",
          content: `Please fill in the ${key.replace(/([A-Z])/g, " $1").toLowerCase()}.`,
        });
        return;
      }
    }

    // Full Name: at least 2 words, only letters and spaces
    if (!/^[A-Za-z]+(?: [A-Za-z]+)+$/.test(data.fullName.trim())) {
        messageApi.destroy()
        messageApi.open({
          type: "error",
          content: `Full Name must contain at least two words and only letters.`,
        });
        return;
    }

    // Address: at least 8 characters
    if (data.address.trim().length < 8) {
        messageApi.destroy()
        messageApi.open({
          type: "error",
          content: `Address must be at least 8 characters long.`,
        });
      return;
    }

    // City: only letters and spaces, at least 2 characters
    if (!/^[A-Za-z ]{2,}$/.test(data.city.trim())) {
        messageApi.destroy()
        messageApi.open({
          type: "error",
          content: `City must contain only letters and be at least 2 characters.`,
        });
      return;
    }

    // Postal Code: exactly 5 digits
    if (!/^\d{5}$/.test(data.postalCode.trim())) {
        messageApi.destroy()
        messageApi.open({
          type: "error",
          content: `Postal Code must be exactly 5 digits.`,
        });
      return;
    }

    // Country: must be one of the allowed options
    const allowedCountries = ["pakistan", "uae", "saudi-arabia"];
    if (!allowedCountries.includes(data.country)) {
        messageApi.destroy()
        messageApi.open({
          type: "error",
          content: `Please select a valid country.`,
        });
      return;
    }

    messageApi.open({
      type: "loading",
      content: `Placing order...`,
    });



    await setDoc(doc(db, "orders", auth.currentUser.uid), {
        paymentInfo: {
            ...data,
        },
        orders: arrayUnion(
          {
            OrderId: Date.now(),
            placedAt: new Date().toISOString(),
            items : user.cart,
            status: "Preparing",
            totalAmount: user.cart.reduce((total, item) => total + item.price * item.quantity, 0),
          },
        ),
        userId: auth.currentUser.uid

    }, { merge: true });

    dispatch(clearCart(auth.currentUser.uid));

    messageApi.destroy()
    messageApi.open({
      type: "success",
      content: `Payment information updated successfully.`,
    });
  };
  return (
    <>
    {contextHolder}
      <div className='bg-light-primary w-full flex justify-center py-4 pt-6 px-5 xs:px-10 md:px-15 lg:px-20 xl:px-30'>
        <form
          onSubmit={handlePayment}
          className=' layout-content-container flex flex-col max-w-[960px] flex-1'
        >
          <div className='flex flex-col gap-3 p-4'>
            <div className='flex gap-6 justify-between'>
              <p className='text-white text-base font-medium leading-normal'>
                Shipping Address
              </p>
            </div>
            <div className='w-full rounded bg-[#3e3a55]'>
              <div className='h-2 rounded bg-white w-1/4'></div>
            </div>
          </div>
          <div>
            <div className='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
              <label
                htmlFor='fullName'
                className='flex flex-col min-w-40 flex-1'
              >
                <p className='text-white text-base font-medium leading-normal pb-2'>
                  Full Name
                </p>
                <input
                  name='fullName'
                  placeholder='e.g Hasnain'
                  className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#2a273a] focus:border-none h-14 placeholder:text-[#a09bbb] p-4 text-base font-normal leading-normal'
                />
              </label>
            </div>
            <div className='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
              <label
                htmlFor='address'
                className='flex flex-col min-w-40 flex-1'
              >
                <p className='text-white text-base font-medium leading-normal pb-2'>
                  Address
                </p>
                <input
                  name='address'
                  placeholder='e.g. 123 Main St'
                  className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#2a273a] focus:border-none h-14 placeholder:text-[#a09bbb] p-4 text-base font-normal leading-normal'
                />
              </label>
            </div>
            <div className='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
              <label htmlFor='city' className='flex flex-col min-w-40 flex-1'>
                <p className='text-white text-base font-medium leading-normal pb-2'>
                  City
                </p>
                <input
                  name='city'
                  placeholder='e.g. Karachi'
                  className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#2a273a] focus:border-none h-14 placeholder:text-[#a09bbb] p-4 text-base font-normal leading-normal'
                />
              </label>
              <label
                htmlFor='postalCode'
                className='flex flex-col min-w-40 flex-1'
              >
                <p className='text-white text-base font-medium leading-normal pb-2'>
                  Postal Code
                </p>
                <input
                  name='postalCode'
                  placeholder='e.g. 12345'
                  className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#2a273a] focus:border-none h-14 placeholder:text-[#a09bbb] p-4 text-base font-normal leading-normal'
                />
              </label>
            </div>
            <div className='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
              <label
                htmlFor='country'
                className='flex flex-col min-w-40 flex-1'
              >
                <p className='text-white text-base font-medium leading-normal pb-2'>
                  Country
                </p>
                <select
                  name='country'
                  className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#2a273a] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-[#a09bbb] p-4 text-base font-normal leading-normal'
                >
                  <option defaultChecked value='pakistan'>
                    Pakistan
                  </option>
                  <option value='uae'>Uae</option>
                  <option value='saudi-arabia'>Saudi Arabia</option>
                </select>
              </label>
            </div>
            <div className='flex px-4 py-3'>
              <button
                type='submit'
                className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-light-btn active:bg-light-btn/90 text-white text-sm font-semibold leading-normal tracking-[0.015em]'
              >
                <span className='truncate'>Place Order</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
