import React from "react";

const ProductForm = ({
  formData,
  setFormData,
  message,
  messageType,
  editingId,
  submitting,
  onSubmit,
  onCancel
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-md p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {editingId ? "Edit Product" : "Add Product"}
        </h1>
        <p className="text-gray-600 text-sm md:text-base">Manage TimeStore products on MongoDB</p>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-2 ${
            messageType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            required
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Classic watch"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
            <input
              required
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="TimeStore"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
            <input
              required
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Analog"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color *</label>
            <input
              required
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Silver"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-colors"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input
              required
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="2999"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              min="0"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="10"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image {editingId ? "(Optional - leave empty to keep current image)" : "*"}
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required={!editingId}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description..."
            rows="4"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 resize-vertical transition-colors"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
            className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
            Featured Product (will appear on home page)
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 rounded-full py-3 font-semibold text-white transition-all duration-300 ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:scale-105 hover:shadow-lg active:scale-102 active:shadow-sm"
            }`}
          >
            {submitting ? "Saving..." : editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 sm:flex-none rounded-full bg-gray-300 text-gray-700 py-3 font-semibold hover:bg-gray-400 hover:scale-105 transition-all duration-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default ProductForm;