import React, { useState, useMemo, useEffect, useRef } from "react";
import Filters from "../components/Filter/Filters";
import MobileFilterDrawer from "../components/features/products/MobileFilterDrawer";
import MainSection from "../components/features/products/MainSection";
import apiClient from "../services/apiClient";

const Products = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    genders: [],
    colors: [],
    types: [],
    priceRange: { minPrice: 0, maxPrice: 1000000 }
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const filtersInitializedRef = useRef(false);

  const [filters, setFilters] = useState({
    brands: [],
    genders: [],
    colors: [],
    types: [],
    maxPrice: 1000000,
    minPrice: 0,
  });

  useEffect(() => {
    if (!filtersInitializedRef.current) {
      filtersInitializedRef.current = true;
      fetchFilterOptions();
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchProductsOnFilterChange();
  }, [filters, searchQuery]);

  
  useEffect(() => {
    if (currentPage !== 1) {
      fetchProducts();
    }
  }, [currentPage]);

  const fetchFilterOptions = async () => {
    try {
      const data = await apiClient.get("/products/filter-options");
      setFilterOptions(data);
      setFilters(prev => ({
        ...prev,
        maxPrice: data.priceRange.maxPrice
      }));
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const fetchProductsOnFilterChange = async () => {
    setLoading(true);
    try {
      const params = {
        page: 1, 
        limit: 12,
      };

      if (searchQuery) params.search = searchQuery;
      if (filters.brands.length > 0) params.brand = filters.brands.join(',');
      if (filters.genders.length > 0) params.gender = filters.genders.join(',');
      if (filters.colors.length > 0) params.color = filters.colors.join(',');
      if (filters.types.length > 0) params.type = filters.types.join(',');
      
      params.minPrice = filters.minPrice || 0;
      params.maxPrice = filters.maxPrice || filterOptions.priceRange.maxPrice || 10000;

      const data = await apiClient.get("/products", params);
      setAllProducts(data.products || []);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 12,
        search: searchQuery,
      };

      if (filters.brands.length > 0) params.brand = filters.brands.join(',');
      if (filters.genders.length > 0) params.gender = filters.genders.join(',');
      if (filters.colors.length > 0) params.color = filters.colors.join(',');
      if (filters.types.length > 0) params.type = filters.types.join(',');
      
      params.minPrice = filters.minPrice || 0;
      params.maxPrice = filters.maxPrice || maxPriceAvailable || 10000;

      const data = await apiClient.get("/products", params);
      setAllProducts(data.products);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

 

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto w-full px-4">
          <div className="flex flex-col md:flex-row">
            <aside className="hidden md:block w-72 border-r border-gray-200 bg-white">
              <Filters
                products={filterOptions}
                onFilterChange={setFilters}
                isMobile={false}
              />
            </aside>

            <MainSection
              products={allProducts}
              allProducts={allProducts}
              onOpenFilters={() => setMobileFiltersOpen(true)}
              onSearch={setSearchQuery}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <Filters
          products={filterOptions}
          onFilterChange={setFilters}
          onClose={() => setMobileFiltersOpen(false)}
          isMobile={true}
        />
      </MobileFilterDrawer>
    </>
  );
};

export default Products;
