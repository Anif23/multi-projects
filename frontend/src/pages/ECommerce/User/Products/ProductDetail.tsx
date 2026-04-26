import { useParams } from "react-router-dom";
import { useProduct } from "../../../../hooks/user/useProducts";
import { useAddToCart } from "../../../../hooks/user/useCart";
import { useToggleWishlist } from "../../../../hooks/user/useWishlist";
import { useState } from "react";
import toast from "react-hot-toast";
import ProductGallery from "../../../../components/Ecommerce/User/ProductGallery";

const ProductDetail = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useProduct(Number(id));

  const addToCart = useAddToCart();
  const toggleWishlist = useToggleWishlist();

  const [qty, setQty] = useState(1);

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;
  if (!product) return <div className="text-center mt-20">Not found</div>;

  const increase = () => {
    if (qty < product.stock) setQty(q => q + 1);
  };

  const decrease = () => {
    if (qty > 1) setQty(q => q - 1);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">

      <ProductGallery images={product.images} />

      {/* 📦 DETAILS */}
      <div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

        <p className="text-gray-500 mb-4">{product.category?.name}</p>

        {/* PRICE */}
        <div className="text-3xl font-bold text-green-600 mb-4">
          ₹{product.price}
        </div>

        {/* STOCK */}
        <div className="mb-4">
          {product.stock > 0 ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-500">Out of Stock</span>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* 🔢 QTY */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={decrease} className="px-3 py-1 bg-gray-200 rounded">-</button>
          <span>{qty}</span>
          <button onClick={increase} className="px-3 py-1 bg-gray-200 rounded">+</button>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">

          {/* ❤️ */}
          <button
            onClick={() => toggleWishlist.mutate(product.id)}
            className="px-4 py-2 border rounded-lg"
          >
            {product.isWishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
          </button>

          {/* 🛒 */}
          <button
            disabled={product.stock === 0 || addToCart.isPending}
            onClick={() =>
              addToCart.mutate(
                { productId: product.id, quantity: qty },
                {
                  onSuccess: () => {
                    setQty(1);
                  },
                }
              )
            }
            className="bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {addToCart.isPending ? "Adding..." : "Add to Cart"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;