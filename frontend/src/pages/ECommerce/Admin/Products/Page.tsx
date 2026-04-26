import { useNavigate } from "react-router-dom";
import DataTable from "../../../../components/Ecommerce/DataTable";
import ImageCell from "../../../../components/Ecommerce/ImageCell";
import { useAdminProducts, useDeleteProduct } from "../../../../hooks/admin/useAdminProducts";

const Products = () => {
  const navigate = useNavigate();
  const deleteProduct = useDeleteProduct();

  const { data: products, isLoading: productLoading } = useAdminProducts();

  if (productLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading products...
      </div>
    );
  }

  const columns = [
    {
      header: "Image",
      render: (row: any) => <ImageCell images={row.images} />
    },
    {
      header: "Name",
      accessor: "name"
    },
    {
      header: "Price",
      render: (row: any) => `₹${row.price}`
    },
    {
      header: "Stock",
      accessor: "stock"
    },
    {
      header: "Actions",
      render: (row: any) => (
        <div className="space-x-2">
          <button
            onClick={() => navigate(`/admin/ecommerce/product/${row.id}`)}
            className="text-blue-500"
          >
            Edit
          </button>

          <button
            onClick={() => deleteProduct.mutate(row.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Products</h1>

        <button
          onClick={() => navigate("/admin/ecommerce/product")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default Products;