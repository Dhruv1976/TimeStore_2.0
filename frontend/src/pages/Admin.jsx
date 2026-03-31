import React, { useEffect, useState, useRef } from "react";
import apiClient from "../services/apiClient";
import AdminAuthGuard from "../components/Admin/AdminAuthGuard";
import ProductForm from "../components/Admin/ProductForm";
import ProductList from "../components/Admin/ProductList";

const Admin = () => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    type: "",
    color: "",
    gender: "",
    price: "",
    stock: "",
    description: "",
    featured: false,
    image: null,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchSuggestions([]);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await apiClient.get("/products", { limit: 100 });
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoadingProducts(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const query = searchQuery.trim().toLowerCase();
    if (query && !product.title.toLowerCase().includes(query) && !product.brand.toLowerCase().includes(query)) {
      return false;
    }
    if (featuredFilter === "featured" && !product.featured) {
      return false;
    }
    if (featuredFilter === "non-featured" && product.featured) {
      return false;
    }
    return true;
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setSearchSuggestions([]);
      return;
    }

    const lower = value.toLowerCase();
    const matches = products.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.type.toLowerCase().includes(lower)
    );
    setSearchSuggestions(matches.slice(0, 6));
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchSuggestions([]);
    }
  };

  const handleSuggestionSelect = (product) => {
    setSearchQuery(product.title);
    setSearchSuggestions([]);
  };

  const handleFilterSelect = (filterValue) => {
    setFeaturedFilter(filterValue);
    setIsFilterOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    if (!editingId) {
      if (!formData.title || !formData.brand || !formData.type || !formData.color || !formData.price) {
        setMessage("Please fill in all required fields");
        setMessageType("error");
        setSubmitting(false);
        return;
      }
      if (!formData.image) {
        setMessage("Please select a product image");
        setMessageType("error");
        setSubmitting(false);
        return;
      }
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("color", formData.color);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("featured", formData.featured.toString());

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const endpoint = editingId
        ? `/products/${editingId}`
        : "/products";

      const data = editingId 
        ? await apiClient.patch(endpoint, formDataToSend)
        : await apiClient.post(endpoint, formDataToSend);

      setMessage(editingId ? "Product updated successfully!" : "Product added successfully!");
      setMessageType("success");

      setFormData({
        title: "",
        brand: "",
        type: "",
        color: "",
        gender: "Unisex",
        price: "",
        stock: "",
        description: "",
        featured: false,
        image: null,
      });

      setEditingId(null);

      const fileInput = document.getElementById("image");
      if (fileInput) fileInput.value = "";

      fetchProducts();

      setTimeout(() => setMessage(""), 2500);
    } catch (error) {
      setMessage(error.message || "An error occurred");
      setMessageType("error");
    }

    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await apiClient.delete(`/products/${id}`);

      setMessage("Product deleted successfully!");
      setMessageType("success");
      fetchProducts();

      setTimeout(() => setMessage(""), 2500);
    } catch (error) {
      setMessage(error.message || "An error occurred");
      setMessageType("error");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      title: product.title,
      brand: product.brand,
      type: product.type,
      color: product.color,
      gender: product.gender,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || "",
      featured: product.featured || false,
      image: null,
    });
    window.scrollTo(0, 0);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: "",
      brand: "",
      type: "",
      color: "",
      gender: "Unisex",
      price: "",
      stock: "",
      description: "",
      featured: false,
      image: null,
    });
    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = "";
  };

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-slate-50 py-6 md:py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              message={message}
              messageType={messageType}
              editingId={editingId}
              submitting={submitting}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />

            <ProductList
              products={products}
              filteredProducts={filteredProducts}
              loadingProducts={loadingProducts}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchKeyDown={handleSearchKeyDown}
              searchSuggestions={searchSuggestions}
              onSuggestionSelect={handleSuggestionSelect}
              searchRef={searchRef}
              featuredFilter={featuredFilter}
              isFilterOpen={isFilterOpen}
              onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
              onFilterSelect={handleFilterSelect}
              filterRef={filterRef}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
};

export default Admin;
