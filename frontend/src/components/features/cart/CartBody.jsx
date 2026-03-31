import React from "react";
import CartItem from "./CartItem";

const CartBody = ({ cartItems, onQuantityChange, onRemove }) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4">
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          Your cart is empty.
        </p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))
      )}
    </div>
  );
};

export default CartBody;
