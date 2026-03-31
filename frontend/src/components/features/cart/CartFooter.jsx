import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartFooter = ({ total, onClose }) => {
  const navigate = useNavigate();
  const totalItems = useSelector((state) => state.cart.totalQuantity);

  const handleCheckout = () => {
    if (totalItems === 0) return;
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="p-4 flex justify-between items-center bg-white shadow-md">
      <div className="text-lg font-medium">Total: ₹{total}</div>
      <button
        onClick={handleCheckout}
        disabled={totalItems === 0}
        className={`text-white px-5 py-2 rounded-full font-medium transition transform hover:scale-105 ${
          totalItems === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartFooter;
