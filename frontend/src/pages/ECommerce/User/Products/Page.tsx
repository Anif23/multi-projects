import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts, useCategories } from "../../../../hooks/user/useProducts";
import ProductCard from "../../../../components/Ecommerce/User/ProductCard";

const UserProducts = () => {
  const [params] = useSearchParams();
  const search = params.get("search") || "";

  const { data: products = [], isLoading: productLoading } = useProducts({ search });
  const { data: categories = [], isLoading: categoryLoading } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter((p: any) => p.categoryId === selectedCategory)
    : products;

  if (productLoading || categoryLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🏷️ CATEGORY FILTER */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-1 rounded-full border ${
            !selectedCategory
              ? "bg-black text-white"
              : "bg-white text-gray-700"
          }`}
        >
          All
        </button>

        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1 rounded-full border ${
              selectedCategory === cat.id
                ? "bg-black text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 🛍️ PRODUCT GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          No products found 😕
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProducts;