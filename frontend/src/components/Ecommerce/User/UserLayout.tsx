import { Outlet } from "react-router-dom";
import UserHeader from "./Header";
import { useState } from "react";

const UserLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <UserHeader open={open} setOpen={setOpen} />
      
      <main className="pt-20 p-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;