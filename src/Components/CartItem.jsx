import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { deleteCart } from "./Features/UserSlice";
import { auth } from "../Firebase/Firebase";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);


  const handleDel= ()=>{
    console.log('handleDel');
    
    setLoading(true)
    const userId = auth.currentUser.uid;
    dispatch(deleteCart({delItem : item, userId}))
    setLoading(false)
  }


  return (
    <div className="flex items-center justify-between rounded-lg border-2 shadow border-light-secondary p-3">
      <img src={item.image} alt={item.title} className="w-18 h-18 object-cover rounded-md overflow-hidden" />
      <div className="flex-1 flex flex-col  mx-4">
        <h3 className="text-lg text-light-text font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-400">${item.price}</p>
        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
      </div>
      <button disabled={loading} onClick={handleDel} className="bg-light-text cursor-pointer text-white px-4 py-2 rounded-md">Remove</button>
    </div>
  );
};

export default CartItem;
