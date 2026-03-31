import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice";
import apiClient from "../services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || "Product not found"}</p>
      </div>
    );
  }

  const numericPrice = product.price;

  const handleQuantityChange = (type) => {
    if (type === "inc" && quantity < (product.stock || 1)) setQuantity(prev => prev + 1);
    else if (type === "dec" && quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    if (!product.stock || product.stock <= 0) {
      toast.error("This product is out of stock", {
        position: "top-right",
        autoClose: 2000,
        style: {
          background: "#ffffff",
          color: "#000000",
          fontWeight: "500",
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        },
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available`, {
        position: "top-right",
        autoClose: 2000,
        style: {
          background: "#ffffff",
          color: "#000000",
          fontWeight: "500",
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        },
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }
    dispatch(addItem({
      id: product._id || product.id,
      name: product.title,
      price: numericPrice,
      quantity: quantity,
      img: product.image || product.img
    }));

    toast.success(`${quantity} x ${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      style: {
        background: "#ffffff",
        color: "#000000",
        fontWeight: "500",
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      },
      pauseOnHover: false,
      draggable: true,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 w-full flex justify-center items-center bg-gray-100 p-4 rounded-xl shadow-md">
        <img
          src={product.image || product.img}
          alt={product.title}
          className="w-full max-w-md h-[70vh] object-contain rounded-lg"
          onError={(e) => e.target.src = '/assets/data/placeholder.png'}
        />
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600 text-lg">Brand: {product.brand}</p>
        <p className="text-gray-600 text-lg">Type: {product.type}</p>
        <p className="text-gray-600 text-lg">Color: {product.color}</p>
        <p className="text-gray-600 text-lg">Gender: {product.gender}</p>
        <p className="text-2xl font-semibold text-gray-900">
          ₹{numericPrice.toLocaleString()}
        </p>
        
        {product.stock !== undefined && (
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  In Stock
                </span>
                <span className="text-sm text-gray-600">
                  {product.stock} available
                </span>
              </>
            ) : (
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                Out of Stock
              </span>
            )}
          </div>
        )}
        
        <p className="text-gray-700">{product.description}</p>

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => handleQuantityChange("dec")}
            className="px-4 py-2 border rounded hover:bg-gray-200 transition"
          >
            -
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange("inc")}
            disabled={!product.stock || product.stock <= 0 || quantity >= product.stock}
            className="px-4 py-2 border rounded hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.stock || product.stock <= 0}
          className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {product.stock && product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>

      <ToastContainer
        newestOnTop={true}
        limit={3}
        style={{ top: '100px' }}
      />
    </div>
  );
};

export default ProductPage;
