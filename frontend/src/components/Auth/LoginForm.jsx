import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../store/authSlice'
import apiClient from '../../services/apiClient'
import { useAsyncOperation } from '../../hooks/useAsyncOperation'

const LoginForm = ({ onToggle }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { loading, error, executeAsync } = useAsyncOperation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await executeAsync(async () => {
            const response = await apiClient.post("/users/login", formData);
            dispatch(loginSuccess(response.user));
            window.dispatchEvent(new Event('authChange'));
            setTimeout(() => navigate("/products"), 1000);
        });
    };

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-600">Sign in to your account</p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-transform duration-300 active:scale-102 active:shadow-sm disabled:opacity-50"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
                Don't have an account?{" "}
                <button onClick={onToggle} className="text-gray-900 hover:text-gray-700 font-semibold">
                    Sign up
                </button>
            </p>
        </div>
    );
};

export default LoginForm;