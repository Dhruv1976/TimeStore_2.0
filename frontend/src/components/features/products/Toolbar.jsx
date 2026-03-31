import React from "react";
import { FiFilter } from "react-icons/fi";
import SortingDropdown from "./SortingDropdown";

const Toolbar = ({ onOpenFilters, onSortChange }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3 mb-6 px-4 sm:px-0">
      <button
        onClick={onOpenFilters}
        className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-50 active:scale-95 transition shadow-sm"
      >
        <FiFilter className="text-base" />
        Filters
      </button>

      <div className="w-full md:w-48">
        <SortingDropdown onSortChange={onSortChange} />
      </div>
    </div>
  );
};

export default Toolbar;
