import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiChevronDown } from "react-icons/fi";
import apiClient from "../services/apiClient";

const AdminOrders = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isInitialized = useSelector((state) => state.auth.isInitialized);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!user || user.role !== "admin") {
      navigate("/auth");
      return;
    }

    fetchAllOrders();
  }, [navigate, user, isInitialized]);

  const fetchAllOrders = async () => {
    try {
      const data = await apiClient.get("/orders/all");
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(err.message || "Failed to fetch orders");
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      await apiClient.patch(`/orders/${orderId}/status`, { status: newStatus });
      
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));

      setSuccessMessage("Order status updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update order status");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Initializing...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 hover:scale-105 transition-transform duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Order Management</h1>

        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-gray-600">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
                    <p className="text-sm text-gray-500">
                      OrderID: {order._id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Customer: {order.userId?.email || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">₹{order.total}</p>
                  </div>
                </div>

                <div className="border-t pt-4 pb-4">
                  <h4 className="font-medium mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                        <p className="font-semibold">₹{item.quantity * item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 pb-4">
                  <h4 className="font-medium mb-2">Shipping Address:</h4>
                  <p className="text-sm text-gray-600">
                    {order.shipping.fullName}<br />
                    {order.shipping.address}<br />
                    {order.shipping.city}, {order.shipping.postalCode}<br />
                    {order.shipping.country}<br />
                    Phone: {order.shipping.phone}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Payment Method:</h4>
                      <p className="text-sm text-gray-600 capitalize">{order.paymentMethod}</p>
                    </div>
                    <div className="w-full md:w-56">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                      <div className="relative">
                        <button
                          onClick={() => setOpenDropdownId(openDropdownId === order._id ? null : order._id)}
                          disabled={updatingOrderId === order._id}
                          className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm text-sm hover:bg-gray-50 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="capitalize font-medium">{order.status}</span>
                          <FiChevronDown
                            className={`transition-transform duration-300 ${openDropdownId === order._id ? "rotate-180" : ""}`}
                          />
                        </button>

                        <div
                          className={`absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 ease-out origin-top z-50 ${
                            openDropdownId === order._id
                              ? "opacity-100 scale-y-100"
                              : "opacity-0 scale-y-95 pointer-events-none"
                          }`}
                        >
                          <button
                            onClick={() => {
                              handleStatusUpdate(order._id, "pending");
                              setOpenDropdownId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition capitalize"
                          >
                            Pending
                          </button>
                          <button
                            onClick={() => {
                              handleStatusUpdate(order._id, "confirmed");
                              setOpenDropdownId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition capitalize"
                          >
                            Confirmed
                          </button>
                          <button
                            onClick={() => {
                              handleStatusUpdate(order._id, "shipped");
                              setOpenDropdownId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition capitalize"
                          >
                            Shipped
                          </button>
                          <button
                            onClick={() => {
                              handleStatusUpdate(order._id, "delivered");
                              setOpenDropdownId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition capitalize"
                          >
                            Delivered
                          </button>
                          <button
                            onClick={() => {
                              handleStatusUpdate(order._id, "cancelled");
                              setOpenDropdownId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition capitalize"
                          >
                            Cancelled
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
