import React, { useState } from "react";
import { IoSearchOutline, IoSearchSharp } from "react-icons/io5";

const SearchButton = ({ onClick, className = "" }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            className={`flex items-center gap-2 text-base bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition ${className}`}
        >
            {isHovered ? <IoSearchSharp /> : <IoSearchOutline />}
            <span className="text-sm text-gray-500">Search</span>
        </button>
    );
};

export default SearchButton;
