import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ open, setOpen }: any) => {
  const { pathname } = useLocation();

  const nav = [
    { name: "Dashboard", path: "/admin/ecommerce" },
    { name: "Products", path: "/admin/ecommerce/products" },
    { name: "Categories", path: "/admin/ecommerce/categories" },
  ];

  return (
    <div
      className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white shadow transform ${
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } transition`}
    >
      <div className="p-4 font-bold text-lg">🛒 Admin</div>

      <nav className="flex flex-col gap-2 p-3">
        {nav.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={`p-2 rounded ${
              pathname === item.path
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;