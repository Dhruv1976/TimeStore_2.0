import React from "react";
import Card from "./Card";

const ProductList = ({ products }) => {
  return (
    <section className="p-6">
      <div className="max-w-6xl xl:max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
        {products.map((product) => (
          <Card key={product._id || product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
