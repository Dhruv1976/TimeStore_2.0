import React from "react";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
    const inStock = product.stock && product.stock > 0;
    
    return (
        <Link to={`/product/${product._id || product.id}`}>
            <div className="flex flex-col items-center bg-gray-100 rounded-2xl shadow-md w-[280px] md:w-[320px] p-4 transition-transform duration-300 hover:scale-105 relative">
                <div className="absolute top-2 right-2">
                    {inStock ? (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                            In Stock
                        </span>
                    ) : (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                            Out of Stock
                        </span>
                    )}
                </div>

                <img
                    src={product.image || product.img}
                    alt={product.title}
                    className="w-28 h-auto object-contain mb-4"
                    onError={(e) => e.target.src = '/assets/data/placeholder.png'}
                />
                <h2 className="text-lg font-semibold text-gray-800 text-center">
                    {product.title}
                </h2>
                <p className="text-sm text-gray-600 text-center">₹{product.price}</p>
                {product.stock !== undefined && (
                    <p className="text-xs text-gray-500 mt-2">
                        {product.stock} available
                    </p>
                )}
            </div>
        </Link>
    );
};

export default Card;
