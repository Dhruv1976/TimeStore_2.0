import React from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-gray-300">
      <div className="flex flex-col sm:flex-row gap-4">
        {product.image && (
          <div className="flex-shrink-0">
            <img
              src={product.image}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200"
              alt={product.title}
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{product.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {product.brand} • {product.type} • {product.color}
              </p>
            </div>
            {product.featured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200 self-start">
                Featured
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-4 text-sm">
              <span className="font-semibold text-gray-900">₹{product.price}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.stock > 10
                  ? "bg-green-100 text-green-800"
                  : product.stock > 0
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}>
                Stock: {product.stock}
              </span>
            </div>

            <div className="flex gap-2 mt-3 sm:mt-0">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 sm:flex-none px-3 py-2 bg-gray-900 text-white text-xs sm:text-sm rounded-full hover:bg-gray-700 hover:scale-105 transition-all duration-300 font-medium"
              >
                <span className="sm:hidden">Edit</span>
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="flex-1 sm:flex-none px-3 py-2 bg-red-500 text-white text-xs sm:text-sm rounded-full hover:bg-red-600 hover:scale-105 transition-all duration-300 font-medium"
              >
                <span className="sm:hidden">Delete</span>
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;