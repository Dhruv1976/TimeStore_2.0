import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isInitialized = useSelector((state) => state.auth.isInitialized);
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!user) {
      navigate('/auth');
    }
  }, [user, isInitialized, navigate]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitted, setSubmitted] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0 || !agreeToTerms) return;

    setLoading(true);
    setError("");

    try {
      const orderData = {
        orderId: "TS-" + Date.now(),
        items: cartItems.map(item => ({
          productId: item.id.toString(),
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        total: cartTotal,
        shipping: {
          fullName: formData.fullName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        paymentMethod: paymentMethod,
      };

      const data = await apiClient.post("/orders", orderData);

      setOrderId(data.orderId);

      dispatch(clearCart());
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600">Add items to cart and then come back here to checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
          {submitted ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <svg className="w-20 h-20 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 mb-2">Thank you for your order.</p>
              <p className="text-sm text-gray-500 mb-6">Order ID: <span className="font-semibold text-gray-700">{orderId}</span></p>
              <p className="text-gray-600 mb-8">We'll deliver your order using <span className="font-semibold">Cash on Delivery</span>. Pay when you receive it.</p>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 hover:scale-105 transition-transform duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input
                    required
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input
                    required
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h3>
                <div className="space-y-3">
                  <div className="flex items-center border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-500 transition" onClick={() => setPaymentMethod("cod")}>
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="h-4 w-4 text-gray-900"
                    />
                    <label htmlFor="cod" className="ml-3 flex-1 cursor-pointer">
                      <p className="text-gray-800 font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </label>
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition opacity-60">
                    <input
                      type="radio"
                      id="card"
                      name="payment"
                      value="card"
                      disabled
                      className="h-4 w-4 text-gray-400"
                    />
                    <label htmlFor="card" className="ml-3 flex-1">
                      <p className="text-gray-600 font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-gray-500">Coming soon</p>
                    </label>
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition opacity-60">
                    <input
                      type="radio"
                      id="upi"
                      name="payment"
                      value="upi"
                      disabled
                      className="h-4 w-4 text-gray-400"
                    />
                    <label htmlFor="upi" className="ml-3 flex-1">
                      <p className="text-gray-600 font-medium">UPI/Digital Wallet</p>
                      <p className="text-sm text-gray-500">Coming soon</p>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the <span className="text-gray-900">Terms of Service</span> and <span className="text-gray-900">Privacy Policy</span>.
                </label>
              </div>

              <button
                type="submit"
                disabled={!agreeToTerms || cartItems.length === 0 || loading}
                className={`w-full mt-4 py-3 rounded-full font-semibold transition-transform duration-300 ${
                  (!agreeToTerms || cartItems.length === 0 || loading)
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-700 hover:scale-105"
                }`}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          )}
        </div>

        <aside className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items in cart.</p>
            )}
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">Note: payment gateway is not integrated yet.</p>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
