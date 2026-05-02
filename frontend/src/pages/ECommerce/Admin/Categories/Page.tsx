import { use, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderTree,
  Image as ImageIcon,
  Layers3,
  Pencil,
  Trash2,
} from "lucide-react";

import PageHeader from "../../../../components/Ecommerce/Admin/PageHeader";
import StatsCard from "../../../../components/Ecommerce/StatsCard";
import FilterBar from "../../../../components/Ecommerce/Admin/FilterBar";
import DataTable from "../../../../components/Ecommerce/Admin/DataTable";
import Pagination from "../../../../components/Ecommerce/Admin/Pagination";

import {
  useAdminCategories,
  useDeleteCategory,
} from "../../../../hooks/admin/useAdminCategories";

const PER_PAGE = 8;

const Categories = () => {
  const navigate = useNavigate();

  const deleteCategory = useDeleteCategory();

  const {
    data: categories = [],
    isLoading,
  } = useAdminCategories();

  const [search, setSearch] =
    useState("");

  const [imageFilter, setImageFilter] =
    useState("all");

  const [page, setPage] =
    useState(1);

  const filtered = useMemo(() => {
    return categories.filter((p: any) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        imageFilter === "all"
          ? true
          : imageFilter === "image"
            ? p.image
            : !p.image;

      return matchSearch && matchStatus;
    });
  }, [categories, search, imageFilter]);


  const totalPages = Math.ceil(
    filtered.length / PER_PAGE
  );

  const rows = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const columns = [
    {
      header: "Category",
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <img
            src={item.image || "/placeholder.png"}
            className="w-14 h-14 rounded-2xl border object-cover"
          />

          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-xs text-gray-500">ID #{item.id}</p>
          </div>
        </div>
      ),
    },

    {
      header: "Slug",
      accessor: "slug",
    },

    {
      header: "Image Status",
      render: (item: any) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${item.image
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
            }`}
        >
          {item.image ? "Available" : "No Image"}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <PageHeader
        title="Categories"
        subtitle="Manage product categories and collections"
        buttonText="Add Category"
        onClick={() =>
          navigate(
            "/admin/ecommerce/category"
          )
        }
      />

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-5">
        <StatsCard
          title="Total Categories"
          value={categories.length}
          icon={<FolderTree />}
        />

        <StatsCard
          title="With Image"
          value={
            categories.filter(
              (c: any) => c.image
            ).length
          }
          icon={<ImageIcon />}
        />

        <StatsCard
          title="Collections"
          value={
            categories.length
          }
          icon={<Layers3 />}
        />
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        total={filtered.length}
        selects={[
          {
            value: imageFilter,
            onChange: setImageFilter,
            options: [
              { label: "All Categories", value: "all" },
              { label: "With Image", value: "image" },
              { label: "No Image", value: "noimage" },
            ],
          },
        ]}
      />

      <DataTable
        columns={columns}
        rows={rows}
        actions={{
          onEdit: (item) =>
            navigate(`/admin/ecommerce/category/${item.id}`),

          onDelete: (item) =>
            deleteCategory.mutate(item.id),
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

export default Categories;