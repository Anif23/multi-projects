import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../../components/Ecommerce/Admin/PageHeader";
import StatsCard from "../../../../components/Ecommerce/StatsCard";
import FilterBar from "../../../../components/Ecommerce/Admin/FilterBar";
import DataTable from "../../../../components/Ecommerce/Admin/DataTable";
import Pagination from "../../../../components/Ecommerce/Admin/Pagination";

import {
  Package,
  Star,
  AlertTriangle,
} from "lucide-react";

import {
  useAdminProducts,
  useDeleteProduct,
} from "../../../../hooks/admin/useAdminProducts";

const PER_PAGE = 8;

const Products = () => {
  const navigate = useNavigate();

  const deleteProduct = useDeleteProduct();

  const { data: products = [] } =
    useAdminProducts();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const [page, setPage] =
    useState(1);

  const filtered = useMemo(() => {
    return products.filter((p: any) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        status === "all"
          ? true
          : status === "active"
            ? p.isActive
            : !p.isActive;

      return matchSearch && matchStatus;
    });
  }, [products, search, status]);

  const totalPages = Math.ceil(
    filtered.length / PER_PAGE
  );

  const rows = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const columns = [
    {
      header: "Product",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <img
            src={row.images?.[0]?.url}
            className="w-10 h-10 rounded-xl"
          />
          <div>
            <p>{row.name}</p>
            <p className="text-xs text-gray-400">
              {row.category?.name}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      accessor: "price",
    },
    {
      header: "Stock",
      accessor: "stock",
    },
  ]

  return (
    <div className="space-y-6">

      <PageHeader
        title="Products"
        subtitle="Manage products and stock"
        buttonText="Add Product"
        onClick={() =>
          navigate(
            "/admin/ecommerce/product"
          )
        }
      />

      <div className="grid md:grid-cols-3 gap-5">
        <StatsCard
          title="Products"
          value={products.length}
          icon={<Package />}
        />

        <StatsCard
          title="Low Stock"
          value={
            products.filter(
              (p: any) =>
                p.stock <= p.lowStock
            ).length
          }
          icon={<AlertTriangle />}
        />

        <StatsCard
          title="Featured"
          value={
            products.filter(
              (p: any) =>
                p.isFeatured
            ).length
          }
          icon={<Star />}
        />
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        total={filtered.length}
        selects={[
          {
            value: status,
            onChange: setStatus,
            options: [
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          },
        ]}
      />

      <DataTable
        columns={columns}

        rows={rows}

        actions={{
          // onView: (row) => navigate(`/admin/ecommerce/product/${row.id}`),
          onEdit: (row) => navigate(`/admin/ecommerce/product/${row.id}`),
          onDelete: (row) => deleteProduct.mutate(row.id),
        }}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

    </div>
  );
};

export default Products;