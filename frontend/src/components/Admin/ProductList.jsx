import React from "react";
import ProductSearchAndFilter from "./ProductSearchAndFilter";
import ProductCard from "./ProductCard";

const ProductList = ({
  products,
  filteredProducts,
  loadingProducts,
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
  filterRef,
  onEdit,
  onDelete
}) => {
  return (
    <section className="bg-white rounded-2xl shadow-md p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Products ({filteredProducts.length})</h2>
        <ProductSearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onSearchKeyDown={onSearchKeyDown}
          searchSuggestions={searchSuggestions}
          onSuggestionSelect={onSuggestionSelect}
          searchRef={searchRef}
          featuredFilter={featuredFilter}
          isFilterOpen={isFilterOpen}
          onFilterToggle={onFilterToggle}
          onFilterSelect={onFilterSelect}
          filterRef={filterRef}
        />
      </div>

      {loadingProducts ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products yet.</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products match the filter.</p>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-auto pr-2">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;