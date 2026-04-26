import { useProducts, useCategories } from "../../../hooks/user/useProducts";
import ProductCard from "../../../components/Ecommerce/User/ProductCard";
import Footer from "../../../components/Ecommerce/User/Footer";

const UserPage = () => {
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="px-6 md:px-12 mt-6">
        <div className="relative rounded-3xl overflow-hidden bg-black text-white p-10 md:p-16 flex flex-col md:flex-row justify-between items-center">

          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover <br /> Premium Products
            </h1>

            <p className="text-gray-300 mt-4 max-w-md">
              Shop the latest gadgets, fashion, and more with exclusive deals.
            </p>

            <button className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
              Shop Now
            </button>
          </div>

          <img
            src="/hero.png"
            className="w-80 mt-6 md:mt-0 object-contain"
          />
        </div>
      </section>

      {/* ================= CATEGORY SCROLLER ================= */}
      <section className="px-6 md:px-12 mt-10">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((cat: any) => (
            <div
              key={cat.id}
              className="min-w-32.5 bg-white rounded-2xl shadow-sm hover:shadow-md p-4 text-center cursor-pointer transition"
            >
              <img
                src={cat.image}
                className="w-16 h-16 mx-auto object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="px-6 md:px-12 mt-12">
        <h2 className="text-xl font-semibold mb-6">Featured</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ================= CATEGORY SECTIONS ================= */}
      {categories.map((cat: any) => {
        const catProducts = products.filter((p: any) => p.categoryId === cat.id);

        if (!catProducts.length) return null;

        return (
          <section key={cat.id} className="px-6 md:px-12 mt-14">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-semibold">{cat.name}</h2>
              <button className="text-sm text-gray-500 hover:text-black">
                View All →
              </button>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {catProducts.slice(0, 4).map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        );
      })}

      {/* ================= BANNER ================= */}
      <section className="px-6 md:px-12 mt-16">
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white p-10 rounded-3xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Limited Time Offer</h2>
            <p className="text-indigo-200">Up to 50% off</p>
          </div>

          <button className="bg-white text-black px-6 py-2 rounded-xl">
            Shop Now
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default UserPage;