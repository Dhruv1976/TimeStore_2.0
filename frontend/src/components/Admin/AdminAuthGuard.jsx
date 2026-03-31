import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminAuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isInitialized = useSelector((state) => state.auth.isInitialized);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    navigate("/auth");
    return null;
  }

  const isAdmin = user.role?.toLowerCase() === "admin";

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Only administrators can access this page.</p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2 bg-gray-900 text-white rounded-full shadow-md font-semibold hover:scale-105 hover:shadow-lg transition-transform duration-300 active:scale-102 active:shadow-sm"
          >
            Go to Products
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminAuthGuard;