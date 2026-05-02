import { useSearchParams } from "react-router-dom";

import {
  useProducts,
  useCategories,
} from "../../../../hooks/user/useProducts";

import ProductCard from "../../../../components/Ecommerce/User/ProductCard";

const PER_PAGE = 8;

const UserProducts = () => {
  const [params, setParams] = useSearchParams();

  const search = params.get("search") || "";
  const page = Number(params.get("page")) || 1;
  const categoryId = params.get("categoryId") || "";

  const {
    data: productRes,
    isLoading: productLoading,
  } = useProducts({
    search,
    page,
    limit: PER_PAGE,
    categoryId,
  });

  const {
    data: categories = [],
    isLoading: categoryLoading,
  } = useCategories();

  const products = productRes?.data || [];
  const pagination = productRes?.pagination;

  const totalPages =
    pagination?.totalPages || 1;

  const currentPage =
    pagination?.page || 1;

  const total =
    pagination?.total || 0;

  const handlePage = (
    newPage: number
  ) => {
    params.set(
      "page",
      String(newPage)
    );

    setParams(params);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCategory = (
    id?: number
  ) => {
    if (id) {
      params.set(
        "categoryId",
        String(id)
      );
    } else {
      params.delete(
        "categoryId"
      );
    }

    params.set("page", "1");

    setParams(params);
  };

  if (
    productLoading ||
    categoryLoading
  ) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-400">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* HERO */}
      <section className="pb-8">
        <div className="rounded-3xl bg-black text-white px-6 md:px-10 py-10 md:py-14">
          <div className="max-w-3xl">
            <p className="uppercase text-xs tracking-[0.3em] text-gray-400">
              Collection
            </p>

            <h1 className="text-3xl md:text-5xl font-bold mt-3">
              Discover Products
            </h1>

            <p className="text-gray-300 mt-4 max-w-xl">
              Browse premium
              electronics,
              lifestyle
              essentials and
              curated shopping
              collections.
            </p>

            {search && (
              <div className="mt-5 inline-flex bg-white/10 px-4 py-2 rounded-full text-sm">
                Search: "
                {search}"
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="pb-8">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              handleCategory()
            }
            className={`px-5 py-2 rounded-full border transition ${
              !categoryId
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            All
          </button>

          {categories.map(
            (cat: any) => (
              <button
                key={cat.id}
                onClick={() =>
                  handleCategory(
                    cat.id
                  )
                }
                className={`px-5 py-2 rounded-full border transition ${
                  Number(
                    categoryId
                  ) === cat.id
                    ? "bg-black text-white border-black"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            )
          )}
        </div>
      </section>

      {/* TOP BAR */}
      <section className="pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">
              Products
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {total} item
              {total !== 1
                ? "s"
                : ""}{" "}
              found
            </p>
          </div>

          <div className="bg-white rounded-xl px-4 py-2 shadow-sm text-sm text-gray-500">
            Page{" "}
            {currentPage} of{" "}
            {totalPages}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      {products.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
          <div className="text-5xl mb-4">
            🛍️
          </div>

          <h3 className="text-2xl font-semibold">
            No Products
            Found
          </h3>

          <p className="text-gray-500 mt-2">
            Try another
            category or
            search.
          </p>
        </div>
      ) : (
        <section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(
              (
                product: any
              ) => (
                <ProductCard
                  key={
                    product.id
                  }
                  product={
                    product
                  }
                />
              )
            )}
          </div>
        </section>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <section className="pt-12 pb-6">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              disabled={
                !pagination?.hasPrev
              }
              onClick={() =>
                handlePage(
                  currentPage -
                    1
                )
              }
              className="px-4 py-2 rounded-xl bg-white border disabled:opacity-40"
            >
              Prev
            </button>

            {Array.from(
              {
                length:
                  totalPages,
              },
              (_, i) =>
                i + 1
            ).map(
              (
                num
              ) => (
                <button
                  key={
                    num
                  }
                  onClick={() =>
                    handlePage(
                      num
                    )
                  }
                  className={`w-11 h-11 rounded-xl font-medium transition ${
                    currentPage ===
                    num
                      ? "bg-black text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  {num}
                </button>
              )
            )}

            <button
              disabled={
                !pagination?.hasNext
              }
              onClick={() =>
                handlePage(
                  currentPage +
                    1
                )
              }
              className="px-4 py-2 rounded-xl bg-white border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserProducts;