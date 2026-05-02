import { Outlet } from "react-router-dom";
import UserHeader from "./Header";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <UserHeader />

      <main className="flex-1 pt-10 md:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;