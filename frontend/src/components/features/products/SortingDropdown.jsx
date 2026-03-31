import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const SortingDropdown = ({ onSortChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Sort by");
    const dropdownRef = useRef(null);

    const options = [
        "Name: A to Z",
        "Name: Z to A",
        "Price: Low to High",
        "Price: High to Low",
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
        onSortChange(option);
    };

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm text-sm hover:bg-gray-50 active:scale-95 transition"
            >
                {selected}
                <FiChevronDown
                    className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            <div
                className={`absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 ease-out origin-top z-50
        ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none"}`}
            >
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleSelect(option)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SortingDropdown;
