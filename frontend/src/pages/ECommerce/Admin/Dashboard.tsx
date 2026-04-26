import { useEffect, useState } from "react";
import api from "../../../api/client";

const Dashboard = () => {
  const [data, setData] = useState({
    products: 0,
    categories: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const [p, c] = await Promise.all([
        api.get("/products"),
        api.get("/categories"),
      ]);

      setData({
        products: p.data.data.length,
        categories: c.data.data.length,
      });
    };

    fetchCounts();
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-gray-500">Total Products</h2>
        <p className="text-3xl font-bold">{data.products}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-gray-500">Total Categories</h2>
        <p className="text-3xl font-bold">{data.categories}</p>
      </div>

    </div>
  );
};

export default Dashboard;