import React, { useState, useEffect, useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Filters = ({ products, onFilterChange, isMobile, onClose }) => {
    const maxPrice = products.priceRange?.maxPrice || 1000000;

    const [selectedFilters, setSelectedFilters] = useState({
        brands: [],
        genders: [],
        colors: [],
        types: [],
        maxPrice: maxPrice,
        minPrice: 0,
    });

    useEffect(() => {
        if (maxPrice > 0 && selectedFilters.maxPrice !== maxPrice) {
            setSelectedFilters(prev => ({ ...prev, maxPrice: Math.min(prev.maxPrice || maxPrice, maxPrice) }));
        }
    }, [maxPrice, selectedFilters.maxPrice]);

    useEffect(() => {
        onFilterChange(selectedFilters);
    }, [selectedFilters, onFilterChange]);

    const toggleSelection = (key, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter((v) => v !== value)
                : [...prev[key], value],
        }));
    };

    const handlePriceChange = (e) => {
        const value = Number(e.target.value);
        setSelectedFilters((prev) => ({ ...prev, maxPrice: value }));
    };

    const clearAll = () =>
        setSelectedFilters({
            brands: [],
            genders: [],
            colors: [],
            types: [],
            minPrice: 0,
            maxPrice: maxPrice,
        });

    const removeFilter = (filter) => {
        setSelectedFilters((prev) => {
            if (filter.type === "price")
                return { ...prev, minPrice: 0, maxPrice: maxPrice };
            return {
                ...prev,
                [filter.type]: prev[filter.type].filter((v) => v !== filter.value),
            };
        });
    };

    const genderOptions = products.genders || [];
    const colorOptions = products.colors || [];
    const typeOptions = products.types || [];
    const brandOptions = products.brands || [];

    const selectedChips = [
        ...selectedFilters.brands.map((b) => ({ type: "brands", value: b })),
        ...selectedFilters.genders.map((g) => ({ type: "genders", value: g })),
        ...selectedFilters.colors.map((c) => ({ type: "colors", value: c })),
        ...selectedFilters.types.map((t) => ({ type: "types", value: t })),
        { type: "price", value: `₹0 - ₹${selectedFilters.maxPrice}` },
    ];

    const renderButtons = (options, key, selectedArray) => (
        <div className="flex flex-wrap gap-2">
            {options.map((opt, index) => (
                <button
                    key={`${key}-${opt}-${index}`}
                    onClick={() => toggleSelection(key, opt)}
                    className={`px-3 py-1 rounded-full text-sm transition ${selectedArray.includes(opt)
                            ? "bg-black text-white font-medium"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    {opt}
                </button>
            ))}
        </div>
    );

    return (
        <aside
            className={`flex flex-col bg-white ${isMobile ? "fixed top-0 left-0 w-72 z-50 h-full shadow-lg" : "w-72"
                } border-r border-gray-200`}
        >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                <div className="flex items-center gap-4">
                    {selectedChips.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="text-sm text-gray-600 hover:text-black"
                        >
                            Clear All
                        </button>
                    )}
                    {isMobile && onClose && (
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-100"
                        >
                            <AiOutlineClose className="w-5 h-5 text-gray-600" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200">
                {selectedChips.map((chip, index) => (
                    <span
                        key={`${chip.type}-${chip.value}-${index}`}
                        className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 shadow-sm"
                    >
                        {chip.value}
                        {chip.type !== "price" && (
                            <button onClick={() => removeFilter(chip)}>
                                <AiOutlineClose className="w-3 h-3 text-gray-600 hover:text-black" />
                            </button>
                        )}
                    </span>
                ))}
            </div>

            <div className="p-6 space-y-8 overflow-y-auto">
                <div>
                    <h3 className="uppercase text-xs font-semibold text-gray-700 flex items-center mb-3">
                        Price
                        <span className="flex-1 border-b border-gray-200 ml-2"></span>
                    </h3>
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={selectedFilters.maxPrice}
                        onChange={handlePriceChange}
                        className="w-full accent-black"
                    />
                    <div className="text-sm text-gray-600 mt-2">
                        Up to ₹{selectedFilters.maxPrice}
                    </div>
                </div>

                <div>
                    <h3 className="uppercase text-xs font-semibold text-gray-700 flex items-center mb-3">
                        Gender
                        <span className="flex-1 border-b border-gray-200 ml-2"></span>
                    </h3>
                    {renderButtons(genderOptions, "genders", selectedFilters.genders)}
                </div>

                <div>
                    <h3 className="uppercase text-xs font-semibold text-gray-700 flex items-center mb-3">
                        Color
                        <span className="flex-1 border-b border-gray-200 ml-2"></span>
                    </h3>
                    {renderButtons(colorOptions, "colors", selectedFilters.colors)}
                </div>

                <div>
                    <h3 className="uppercase text-xs font-semibold text-gray-700 flex items-center mb-3">
                        Type
                        <span className="flex-1 border-b border-gray-200 ml-2"></span>
                    </h3>
                    {renderButtons(typeOptions, "types", selectedFilters.types)}
                </div>

                <div>
                    <h3 className="uppercase text-xs font-semibold text-gray-700 flex items-center mb-3">
                        Brand
                        <span className="flex-1 border-b border-gray-200 ml-2"></span>
                    </h3>
                    {renderButtons(brandOptions, "brands", selectedFilters.brands)}
                </div>
            </div>
        </aside>
    );
};

export default Filters;
