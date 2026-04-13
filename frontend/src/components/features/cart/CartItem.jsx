import React, { useState, useEffect } from "react";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const [inputValue, setInputValue] = useState(item.quantity);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setInputValue(item.quantity);
    setImageError(false);
  }, [item.quantity, item.img]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleDecrease = () => {
    const newQty = Math.max(1, item.quantity - 1);
    onQuantityChange(item.id, newQty);
  };

  const handleIncrease = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setInputValue(value);
  };

  const submitValue = () => {
    if (inputValue === "") return;
    let value = parseInt(inputValue, 10);
    if (isNaN(value) || value < 1) value = 1;
    onQuantityChange(item.id, value);
  };

  const handleBlur = () => submitValue();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") submitValue();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="relative w-20 h-20 sm:w-16 sm:h-16 rounded-md border bg-gray-100 flex items-center justify-center overflow-hidden">
        {item.img ? (
          <img
            src={item.img}
            alt={item.title || item.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <span className="text-gray-400 text-xs text-center px-1">No Image</span>
        )}
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-base sm:text-sm font-semibold text-gray-800">
          {item.title || item.name}
        </h3>
        <p className="text-gray-600 text-sm sm:text-xs mt-1">
          ₹{item.price.toFixed(2)}
        </p>

        <div className="flex justify-center sm:justify-start items-center mt-3 gap-2">
          <button
            onClick={handleDecrease}
            className="w-9 h-9 sm:w-8 sm:h-8 bg-gray-200 rounded hover:bg-gray-300 transition text-lg font-medium"
          >
            -
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-14 sm:w-12 text-center border rounded-md py-1 text-sm"
          />
          <button
            onClick={handleIncrease}
            className="w-9 h-9 sm:w-8 sm:h-8 bg-gray-200 rounded hover:bg-gray-300 transition text-lg font-medium"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto mt-2 sm:mt-0">
        <p className="font-semibold text-gray-800 text-base sm:text-sm">
          ₹{(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 text-sm mt-1 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
