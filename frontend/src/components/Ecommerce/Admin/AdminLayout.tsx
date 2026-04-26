import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 📦 SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* 📄 CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* 🔝 TOPBAR */}
        <div className="bg-white shadow px-4 py-3 flex items-center justify-between md:hidden">
          <button onClick={() => setOpen(true)}>☰</button>
          <h1 className="font-bold">Admin</h1>
        </div>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;