import React, { useState, useMemo, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import apiClient from "../../../services/apiClient";

const SearchBar = ({ products, onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const searchRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    if (location.search.includes("focus=search")) {
      document.getElementById("productSearch")?.focus();
    }
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.trim() === "") {
      setSuggestions([]);
      onSearch("");
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      onSearch(value);

      try {
        const response = await apiClient.get("/products/suggestions", { q: value });
        setSuggestions(response.suggestions ? response.suggestions.slice(0, 6) : []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSuggestions([]);
      onSearch(query); 
    }
  };

  const handleSelect = (item) => {
    setQuery(item.title);
    onSearch(item.title);
    setSuggestions([]);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-gray-200 transition-colors">
        <IoSearch className="text-gray-500 mr-2" />
        <input
          id="productSearch"
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for watches, brands, or styles..."
          className="flex-grow outline-none bg-transparent text-gray-800 text-sm"
          autoComplete="off"
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-md mt-2 max-h-60 overflow-y-auto z-20 animate-fadeIn">
          {suggestions.map((item, index) => (
            <li
              key={item._id || item.id || index}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
            >
              <span className="font-medium">{item.title}</span>{" "}
              <span className="text-gray-500">({item.brand})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
