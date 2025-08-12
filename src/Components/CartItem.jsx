import React from "react";

const CartItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border-2 shadow border-light-secondary p-3">
      <img src={item.image} alt={item.title} className="w-18 h-18 object-cover rounded-md overflow-hidden" />
      <div className="flex-1 flex flex-col  mx-4">
        <h3 className="text-lg text-light-text font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-400">${item.price}</p>
        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
      </div>
      <button className="bg-light-text cursor-pointer text-white px-4 py-2 rounded-md">Remove</button>
    </div>
  );
};

export default CartItem;
