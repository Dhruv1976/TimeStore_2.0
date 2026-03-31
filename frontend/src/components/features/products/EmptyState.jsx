import React from "react";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-96 text-center text-gray-500">
    <div className="text-6xl mb-4">📦</div>
    <p className="text-xl font-semibold">No products found</p>
    <p className="text-sm">
      Try adjusting filters
    </p>
  </div>
);

export default EmptyState;
