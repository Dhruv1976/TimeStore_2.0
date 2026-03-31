import React from "react";

const CartHeader = ({ onClose }) => {
  return (
    <div className="flex justify-between items-center px-5 py-4 border-b">
      <h2 className="text-lg font-semibold">Shopping Cart</h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-black transition text-xl"
      >
        ✕
      </button>
    </div>
  );
};

export default CartHeader;
