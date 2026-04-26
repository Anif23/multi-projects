// pages/ECommerce/User/Wishlist/Page.tsx
import { useWishlist } from "../../../../hooks/user/useWishlist";
import ProductCard from "../../../../components/Ecommerce/User/ProductCard";

const WishlistPage = () => {
  const { data: items = [], isLoading } = useWishlist();

  if (isLoading) return <div>Loading...</div>;

  if (!items.length) {
    return <div className="text-center mt-20">No wishlist items ❤️</div>;
  }

  return (
    <div className="p-6 grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item: any) => (
        <ProductCard key={item.id} product={item.product} />
      ))}
    </div>
  );
};

export default WishlistPage;