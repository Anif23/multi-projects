import { useNavigate } from "react-router-dom";
import {
  useProducts,
  useCategories,
} from "../../../hooks/user/useProducts";

import ProductCard from "../../../components/Ecommerce/User/ProductCard";
import Footer from "../../../components/Ecommerce/User/Footer";

const UserPage = () => {
  const navigate = useNavigate();

  const {
    data: productRes,
    isLoading,
  } = useProducts();

  const products = productRes?.data || [];

  const {
    data: categories = [],
  } = useCategories();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-400 text-lg">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-[#f8f8f8] overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="pt-4 md:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-black text-white px-6 md:px-14 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
            {/* glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />

            {/* content */}
            <div className="relative z-10">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                New Collection 2026
              </p>

              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Premium
                <br />
                Shopping Experience
              </h1>

              <p className="mt-5 text-gray-300 max-w-lg text-sm sm:text-base">
                Explore electronics, fashion, lifestyle products
                and curated collections built for modern shoppers.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    navigate("/user/ecommerce/products")
                  }
                  className="bg-white text-black px-7 py-3 rounded-xl font-semibold hover:scale-105 transition"
                >
                  Shop Now
                </button>

                <button
                  onClick={() =>
                    navigate("/user/ecommerce/products")
                  }
                  className="border border-white/20 px-7 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  Explore Deals
                </button>
              </div>

              {/* stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 max-w-md">
                <div>
                  <h3 className="text-2xl font-bold">1K+</h3>
                  <p className="text-xs text-gray-400">
                    Products
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold">99%</h3>
                  <p className="text-xs text-gray-400">
                    Happy Buyers
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold">24/7</h3>
                  <p className="text-xs text-gray-400">
                    Support
                  </p>
                </div>
              </div>
            </div>

            {/* image */}
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-75 md:h-130 object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">
                Browse quickly
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">
                Shop by Category
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() =>
                  navigate(
                    `/user/ecommerce/products?categoryId=${cat.id}`
                  )
                }
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition text-center group"
              >
                <img
                  src={cat.image}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-3 group-hover:scale-110 transition"
                />

                <p className="font-medium text-sm line-clamp-1">
                  {cat.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-7">
            <div>
              <p className="text-sm text-gray-500">
                Trending now
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">
                Featured Products
              </h2>
            </div>

            <button
              onClick={() =>
                navigate("/user/ecommerce/products")
              }
              className="text-sm font-medium hover:text-black text-gray-500"
            >
              View All →
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATEGORY BLOCKS ================= */}
      {categories.map((cat: any) => {
        const filtered = products.filter(
          (p: any) => p.categoryId === cat.id
        );

        if (!filtered.length) return null;

        return (
          <section
            key={cat.id}
            className="mt-18"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-7">
                <h2 className="text-2xl font-bold">
                  {cat.name}
                </h2>

                <button
                  onClick={() =>
                    navigate(
                      `/user/ecommerce/products?categoryId=${cat.id}`
                    )
                  }
                  className="text-sm text-gray-500 hover:text-black"
                >
                  View All →
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.slice(0, 4).map((product: any) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ================= OFFER ================= */}
      <section className="mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 md:p-14 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="uppercase text-sm tracking-[0.3em] text-white/70">
                Exclusive Sale
              </p>

              <h2 className="text-3xl md:text-5xl font-bold mt-3">
                Up to 50% OFF
              </h2>

              <p className="mt-4 text-white/80 max-w-md">
                Limited time discounts on selected premium
                products. Grab your favorites before stock
                runs out.
              </p>

              <button
                onClick={() =>
                  navigate("/user/ecommerce/products")
                }
                className="mt-7 bg-white text-black px-7 py-3 rounded-xl font-semibold"
              >
                Shop Deals
              </button>
            </div>

            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"
              className="rounded-3xl h-65 md:h-90 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default UserPage;