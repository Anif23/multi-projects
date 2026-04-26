import { useNavigate } from "react-router-dom";
import DataTable from "../../../../components/Ecommerce/DataTable";
import { useAdminCategories } from "../../../../hooks/admin/useAdminCategories";
import { useDeleteCategory } from "../../../../hooks/admin/useAdminCategories";

const Categories = () => {

  const navigate = useNavigate();
  const deleteCategory = useDeleteCategory();

  const { data: categories, isLoading: categoriesLoading } = useAdminCategories();

  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading Categories...
      </div>
    );
  }

  // 📊 TABLE CONFIG
  const columns = [
    {
      render: (row: any) =>
        <img src={row?.image} className="w-14 h-14 object-contain rounded border" />
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Slug",
      accessor: "slug",
    },
    {
      header: "Actions",
      render: (row: any) => (
        <div className="space-x-3">
          <button
            onClick={() => navigate(`/admin/ecommerce/category/${row.id}`)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => deleteCategory.mutate(row.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>

        <button
          onClick={() => navigate("/admin/ecommerce/category")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Category
        </button>
      </div>

      {/* 📊 TABLE */}
      {categories.length > 0 ? (
        <DataTable columns={columns} data={categories} />
      ) : (
        <div className="text-center py-10 text-gray-400">
          No categories found
        </div>
      )}

    </div>
  );
};

export default Categories;