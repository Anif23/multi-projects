// AdminLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import {
  Menu,
  Bell,
  Search,
  User,
} from "lucide-react";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex">
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* RIGHT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200">
          <div className="h-20 px-4 md:px-8 flex items-center justify-between gap-4">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>

              <div>
                <h2 className="text-xl font-bold">
                  Welcome Back 👋
                </h2>

                <p className="text-sm text-gray-500">
                  Manage your store smartly
                </p>
              </div>
            </div>

            {/* CENTER SEARCH */}
            <div className="hidden md:flex flex-1 max-w-xl relative">
              <input
                placeholder="Search products, orders..."
                className="w-full bg-gray-100 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
              />

              <Search
                size={18}
                className="absolute left-4 top-3.5 text-gray-500"
              />
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <button className="relative p-3 rounded-2xl bg-white border hover:bg-gray-50">
                <Bell size={18} />

                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <button className="w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center">
                <User size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-4 md:p-8 flex-1">
          <div className="max-w-400 mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;