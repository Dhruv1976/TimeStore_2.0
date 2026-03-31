import React, { useEffect, useState, useMemo } from "react";
import Toolbar from "./Toolbar";
import ProductList from "./ProductList";
import EmptyState from "./EmptyState";
import SearchBar from "./SearchBar"; 

const MainSection = ({
  products,
  onOpenFilters,
  allProducts,
  onSearch,
  loading,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    if (sortOption === "Name: A to Z") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "Name: Z to A") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "Price: Low to High") {
      sorted.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === "Price: High to Low") {
      sorted.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return sorted;
  }, [products, sortOption]);

  const handlePageClick = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <main className="w-full p-6">
      {/* Search Bar at top */}
      <div className="mb-6">
        <SearchBar products={allProducts} onSearch={onSearch} />
      </div>

      <Toolbar
        onOpenFilters={onOpenFilters}
        onSortChange={(option) => {
          setSortOption(option);
        }}
        currentSort={sortOption}
      />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : sortedProducts.length > 0 ? (
        <>
          <ProductList products={sortedProducts} />

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-3 flex-wrap">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md border text-sm ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(index + 1)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === index + 1
                      ? "bg-gray-900 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md border text-sm ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </main>
  );
};

export default MainSection;
