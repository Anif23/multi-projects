import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuthStore } from "../../../store/authStore";
import { useGuestCartStore } from "../../../store/guestCartStore";
import { useWishlistStore } from "../../../store/guestWishlistStore";
import { useCart } from "../../../hooks/user/useCart";

const UserHeader = ({ open, setOpen }: any) => {

  const navigate = useNavigate();
  const { token, logout } = useAuthStore();
  const { pathname } = useLocation();

  const guestCart = useGuestCartStore();
  const guestWishlist = useWishlistStore();
  const { data: serverCart } = useCart();

  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/user/ecommerce/products?search=${search}`);
  };


  // 🔢 COUNTS
  const cartCount = token
    ? serverCart?.items?.length || 0
    : guestCart.items.length;

  const wishlistCount = token
    ? 0 // later connect API
    : guestWishlist.items.length;

  const nav = [
    { name: "Home", path: "/user/ecommerce", isGuest: true },
    { name: "Products", path: "/user/ecommerce/products", isGuest: true },
    { name: "Orders", path: "/user/ecommerce/orders", isGuest: false },
    { name: "Profile", path: "/user/ecommerce/profile", isGuest: false },
  ];

  const filteredNav = nav.filter((item) =>
    item.isGuest ? true : !!token
  );

  // 🔥 SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 80) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/80 border-b transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/user/ecommerce" className="text-xl font-bold">
            🛒 My Store
          </Link>

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="w-1/3 hidden md:block">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-full border"
            />
          </form>

          <div className="flex items-center gap-4">

            <div className="relative cursor-pointer">
              <Link to="/user/ecommerce/wishlist">❤️</Link>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* CART */}
            <Link to="/user/ecommerce/cart" className="relative">
              <span>🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-2 ml-4">
              {filteredNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1 rounded-lg text-sm ${pathname === item.path
                      ? "bg-black text-white"
                      : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {token ? (
              <button
                onClick={logout}
                className="hidden md:block text-sm text-red-500"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden md:block bg-black text-white px-4 py-1 rounded-lg text-sm"
              >
                Login
              </Link>
            )}

            {/* MOBILE MENU */}
            <button
              className="md:hidden text-xl"
              onClick={() => setOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4 flex justify-between border-b">
          <h2 className="font-semibold">Menu</h2>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="p-4">
          {/* SEARCH MOBILE */}
          <input
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded mb-4"
          />

          <nav className="flex flex-col gap-2">
            {filteredNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded ${pathname === item.path
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* AUTH */}
          <div className="mt-6">
            {token ? (
              <button
                onClick={logout}
                className="w-full bg-red-500 text-white py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block text-center bg-black text-white py-2 rounded"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeader;