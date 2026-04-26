import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  useAdminCategoryDetail,
  useCreateCategory,
  useUpdateCategory,
} from "../../../../hooks/admin/useAdminCategories";

const CategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const categoryId = Number(id);

  const isEdit = !!id;

  // ✅ hooks
  const { data: category, isLoading } = useAdminCategoryDetail(categoryId, {
    enabled: isEdit,
  }) as any;

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  // 🧠 state
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // ✅ preload data for edit
  useEffect(() => {
    if (category && isEdit) {
      setName(category.name);
      setPreview(category.image); // existing image url
    }
  }, [category, isEdit]);

  // 📸 handle image
  const handleImage = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  // 🚀 submit
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    if (isEdit) {
      updateCategory.mutate(
        { id: categoryId, data: formData },
        {
          onSuccess: () => {
            navigate(-1);
          },
        }
      );
    } else {
      createCategory.mutate(formData, {
        onSuccess: () => {
          navigate(-1);
        },
      });
    }
  };

  if (isEdit && isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md"
      >
        <h2 className="text-xl font-bold mb-6 text-center">
          {isEdit ? "Edit Category" : "Create Category"}
        </h2>

        {/* 🧾 NAME */}
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 w-full rounded-lg mb-4"
        />

        {/* 📸 IMAGE */}
        {!preview ? (
          <label className="border-2 border-dashed p-6 rounded-xl flex flex-col items-center cursor-pointer">
            <span className="text-gray-400 text-sm">
              Click to upload image
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                handleImage(e.target.files?.[0] || null)
              }
            />
          </label>
        ) : (
          <div className="relative">
            <img
              src={preview}
              className="w-full h-48 object-cover rounded-lg"
            />

            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
            >
              ✕
            </button>
          </div>
        )}

        {/* 🚀 SUBMIT */}
        <button
          disabled={createCategory.isPending || updateCategory.isPending}
          className="mt-6 w-full bg-purple-500 text-white py-3 rounded-lg"
        >
          {createCategory.isPending || updateCategory.isPending
            ? "Saving..."
            : isEdit
            ? "Update Category"
            : "Create Category"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;