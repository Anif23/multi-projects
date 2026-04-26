import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminProductDetail, useCreateProduct, useUpdateProduct } from "../../../../hooks/admin/useAdminProducts";
import { useAdminCategories } from "../../../../hooks/admin/useAdminCategories";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const productId = Number(id);

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const { data: product, isLoading } = useAdminProductDetail(productId);

  const { data: categories = [], isLoading: loadingCategories } = useAdminCategories();

  const isEdit = !!id;

  useEffect(() => {
    if (product && isEdit) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        stock: product.stock || "",
        categoryId: product.categoryId || "",
        description: product.description || "",
      });

      setExistingImages(product.images || []);
    }
  }, [product, isEdit]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [deleteImages, setDeleteImages] = useState<number[]>([]);

  if (isEdit && isLoading && loadingCategories) {
    return <div className="text-center mt-10">Loading product...</div>;
  }

  {
    (createProduct.isError || updateProduct.isError) && (
      <div className="text-red-500 text-sm mt-2">
        Something went wrong
      </div>
    )
  }

  // 📸 Handle new images
  const handleImages = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);

    setImages(prev => [...prev, ...fileArray]);

    const previewUrls = fileArray.map(file =>
      URL.createObjectURL(file)
    );

    setPreview(prev => [...prev, ...previewUrls]);
  };

  // ❌ remove new image
  const removePreview = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreview(prev => prev.filter((_, i) => i !== index));
  };

  // ❌ remove existing image
  const removeExisting = (imgId: number) => {
    setDeleteImages(prev => [...prev, imgId]);
    setExistingImages(prev => prev.filter(img => img.id !== imgId));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    images.forEach(file => {
      formData.append("images", file);
    });

    deleteImages.forEach(id => {
      formData.append("deleteImages", id.toString());
    });

    if (isEdit) {
      updateProduct.mutate(
        { id: productId, data: formData },
        {
          onSuccess: () => navigate(-1),
        }
      );
    } else {
      createProduct.mutate(formData, {
        onSuccess: () => navigate(-1),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-6 rounded-xl shadow"
      >
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>

        {/* 🧾 INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
            className="border p-2 rounded"
          />

          <select
            value={form.categoryId}
            onChange={(e) =>
              setForm({ ...form, categoryId: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="border p-2 rounded w-full mt-4"
        />

        {/* 📸 IMAGE UPLOAD */}
        <div className="mt-4 border-2 border-dashed p-4 rounded text-center">
          <input
            type="file"
            multiple
            onChange={(e) => handleImages(e.target.files)}
          />
          <p className="text-gray-400 text-sm">
            Drag & drop or click to upload images
          </p>
        </div>

        {/* 🖼️ EXISTING IMAGES */}
        <div className="flex gap-3 mt-4 flex-wrap">
          {existingImages.map((img) => (
            <div key={img.id} className="relative">
              <img
                src={img.url}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeExisting(img.id)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* 🖼️ NEW PREVIEW */}
        <div className="flex gap-3 mt-4 flex-wrap">
          {preview.map((src, i) => (
            <div key={i} className="relative">
              <img
                src={src}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removePreview(i)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* 🚀 SUBMIT */}
        <button
          disabled={createProduct.isPending || updateProduct.isPending}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
        >
          {isEdit
            ? updateProduct.isPending
              ? "Updating..."
              : "Update Product"
            : createProduct.isPending
              ? "Creating..."
              : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;