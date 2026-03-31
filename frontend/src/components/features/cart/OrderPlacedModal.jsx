import React from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const OrderPlacedModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleContinue = () => {
        onClose();
        navigate("/products");
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm transition-opacity"
                onClick={handleContinue}
            ></div>

            <div className="relative bg-white rounded-3xl shadow-2xl p-10 w-96 max-w-full text-center">
                <div className="w-28 h-28 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-14 w-14 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                    Order Placed!
                </h1>
                <p className="text-gray-600 mb-6 text-base">
                    Your order has been successfully placed. Thank you for shopping with
                    us!
                </p>

                <button
                    onClick={handleContinue}
                    className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition transform hover:scale-105"
                >
                    Continue Shopping
                </button>
            </div>
        </div>,
        document.body
    );
};

export default OrderPlacedModal;
