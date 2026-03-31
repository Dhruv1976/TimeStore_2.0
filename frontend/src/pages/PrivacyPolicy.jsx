import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 my-10 bg-white rounded-xl shadow-md text-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
            <p className="mb-4 text-lg">
                At TimeStore, your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use our website and services.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-700 text-lg">
                <li>Contact details (name, email, phone) when you create an account or place an order.</li>
                <li>Shipping and billing addresses for order fulfillment.</li>
                <li>Order history and payment information (securely processed via trusted payment gateways).</li>
                <li>Browsing data (cookies, device info) to improve your experience.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-700 text-lg">
                <li>To process orders and deliver products.</li>
                <li>To provide customer support and respond to inquiries.</li>
                <li>To send order updates and promotional offers (you can opt out anytime).</li>
                <li>To improve site functionality and personalize your experience.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">Data Protection</h2>
            <p className="mb-4 text-lg">
                We use industry-standard security measures to protect your data. Your payment information is encrypted and never stored on our servers.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
            <p className="mb-4 text-lg">
                We may share information with trusted partners for payment processing and shipping. We do not sell your data to third parties.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-700 text-lg">
                <li>You can access, update, or delete your personal information by contacting us.</li>
                <li>You may opt out of marketing emails at any time.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
            <p className="mb-6 text-lg">
                For questions about this policy, email us at <span className="font-medium">hello@domain.com</span>.
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

export default PrivacyPolicy;
