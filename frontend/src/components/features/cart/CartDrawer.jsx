import React, { useEffect } from "react";
import CartHeader from "./CartHeader";
import CartBody from "./CartBody";
import CartFooter from "./CartFooter";
import { removeItemFromCart, updateCartItemQuantity } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const handleQuantityChange = async (id, qty) => {
    try {
      await dispatch(updateCartItemQuantity(id, qty));
    } catch (error) {
    }
  };

  const handleRemove = async (id) => {
    try {
      await dispatch(removeItemFromCart(id));
    } catch (error) {
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
      />

      <div
        className={`absolute top-0 right-0 h-full w-11/12 max-w-sm sm:w-[380px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out rounded-l-xl ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <CartHeader onClose={onClose} />
        <CartBody
          cartItems={cartItems}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
        <CartFooter total={total} onClose={onClose} />
      </div>
    </div>
  );
};

export default CartDrawer;
