import React from "react";
import { IoSearch } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";

const ProductSearchAndFilter = ({
  searchQuery,
  onSearchChange,
  onSearchKeyDown,
  searchSuggestions,
  onSuggestionSelect,
  searchRef,
  featuredFilter,
  isFilterOpen,
  onFilterToggle,
  onFilterSelect,
  filterRef
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div ref={searchRef} className="relative">
        <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-gray-200 transition-colors">
          <IoSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            onKeyDown={onSearchKeyDown}
            placeholder="Search by title, brand, or type..."
            className="flex-grow outline-none bg-transparent text-gray-800 text-sm"
            autoComplete="off"
          />
        </div>

        {searchSuggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-md mt-2 max-h-60 overflow-y-auto z-20 animate-fadeIn">
            {searchSuggestions.map((product, index) => (
              <li
                key={product._id || index}
                onClick={() => onSuggestionSelect(product)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
              >
                <span className="font-medium">{product.title}</span>{" "}
                <span className="text-gray-500">({product.brand})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div ref={filterRef} className="relative w-full sm:w-48">
        <button
          onClick={onFilterToggle}
          className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm text-sm hover:bg-gray-50 active:scale-95 transition-all duration-300"
        >
          {featuredFilter === "all" ? "All Products" :
           featuredFilter === "featured" ? "Featured Only" :
           "Non-Featured Only"}
          <FiChevronDown
            className={`ml-2 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 ease-out origin-top z-50
          ${isFilterOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none"}`}
        >
          <button
            onClick={() => onFilterSelect("all")}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            All Products
          </button>
          <button
            onClick={() => onFilterSelect("featured")}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            Featured Only
          </button>
          <button
            onClick={() => onFilterSelect("non-featured")}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            Non-Featured Only
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchAndFilter;