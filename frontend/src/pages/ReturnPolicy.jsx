import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReturnPolicy = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 my-10 bg-white rounded-xl shadow-md text-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-center">Return & Refund Policy</h1>
            <p className="mb-4 text-lg">
                We want you to be completely satisfied with your purchase from TimeStore. If you are not happy with your order, please review our return and refund policy below.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Returns</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-700 text-lg">
                <li>Returns are accepted within <span className="font-medium">7 days</span> of delivery.</li>
                <li>Items must be unused, in original packaging, and with all tags attached.</li>
                <li>To initiate a return, contact our support team at <span className="font-medium">hello@domain.com</span> with your order details.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">Refunds</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-700 text-lg">
                <li>Once your return is received and inspected, we will notify you via email.</li>
                <li>If approved, your refund will be processed to your original payment method within 5-7 business days.</li>
                <li>Shipping charges are non-refundable unless the item is defective or incorrect.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">Exchanges</h2>
            <p className="mb-4 text-lg">
                If you received a defective or wrong item, please contact us immediately for a free replacement.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Exceptions</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-700 text-lg">
                <li>Customized or final sale items cannot be returned.</li>
                <li>Products showing signs of use or damage are not eligible for return.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
            <p className="mb-6 text-lg">
                For any questions, email us at <span className="font-medium">hello@domain.com</span> or call (+91) 1800 00 00.
            </p>
            <button
                className="w-full mt-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition"
                onClick={() => navigate("/")}
            >
                Return to Home
            </button>
        </div>
    );
};

export default ReturnPolicy;
