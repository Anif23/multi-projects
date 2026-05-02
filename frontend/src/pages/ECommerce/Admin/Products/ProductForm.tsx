import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../../components/Ecommerce/Admin/PageHeader";
import InputField from "../../../../components/Ecommerce/Forms/InputField";
import TextAreaField from "../../../../components/Ecommerce/Forms/TextAreaField";
import SelectField from "../../../../components/Ecommerce/Forms/SelectField";
import ImageUploader from "../../../../components/Ecommerce/Forms/ImageUploader";
import SectionCard from "../../../../components/Ecommerce/Forms/SectionCard";

import {
  useAdminProductDetail,
  useCreateProduct,
  useUpdateProduct,
} from "../../../../hooks/admin/useAdminProducts";

import { useAdminCategories } from "../../../../hooks/admin/useAdminCategories";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;
  const productId = Number(id);

  const { data: product, isLoading } =
    useAdminProductDetail(productId);

  const { data: categories = [] } = useAdminCategories();

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const [form, setForm] = useState<any>({
    name: "",
    price: "",
    stock: "",
    lowStock: "5",
    categoryId: "",
    description: "",
    sku: "",
    brand: "",
    tags: "",
    isFeatured: false,
    isActive: true,
    discountType: "",
    discountValue: "",
    discountStart: "",
    discountEnd: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  useEffect(() => {
    if (product && isEdit) {
      setForm({
        name: product.name,
        price: product.price,
        stock: product.stock,
        lowStock: product.lowStock,
        categoryId: product.categoryId,
        description: product.description,
        sku: product.sku,
        brand: product.brand,
        tags: product.tags?.join(", "),
        isFeatured: product.isFeatured,
        isActive: product.isActive,
        discountType: product.discountType || "",
        discountValue: product.discountValue || "",
        discountStart: product.discountStart || "",
        discountEnd: product.discountEnd || "",
      });
    }
  }, [product, isEdit]);

  const updateField = (key: string, value: any) => {
    setForm((p: any) => ({ ...p, [key]: value }));
  };

  const handleImages = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);

    setImages((p) => [...p, ...arr]);
    setPreview((p) => [
      ...p,
      ...arr.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeImage = (index: number) => {
    setImages((p) => p.filter((_, i) => i !== index));
    setPreview((p) => p.filter((_, i) => i !== index));
  };

 const handleSubmit = (e: any) => {
  e.preventDefault();

  const fd = new FormData();

  // STRING FIELDS
  fd.append("name", form.name || "");
  fd.append("description", form.description || "");
  fd.append("sku", form.sku || "");
  fd.append("brand", form.brand || "");

  // NUMBERS (convert properly)
  fd.append("price", form.price ? String(Number(form.price)) : "0");
  fd.append("stock", form.stock ? String(Number(form.stock)) : "0");
  fd.append("lowStock", form.lowStock ? String(Number(form.lowStock)) : "5");
  fd.append("categoryId", form.categoryId ? String(Number(form.categoryId)) : "");

  // BOOLEANS (VERY IMPORTANT FIX)
  fd.append("isActive", form.isActive ? "true" : "false");
  fd.append("isFeatured", form.isFeatured ? "true" : "false");

  // TAGS (convert string → array in backend, so keep raw string)
  fd.append("tags", form.tags || "");

  // DISCOUNT (fix empty values properly)
  fd.append("discountType", form.discountType || "");

  fd.append(
    "discountValue",
    form.discountValue !== "" ? String(Number(form.discountValue)) : ""
  );

  fd.append(
    "discountStart",
    form.discountStart || ""
  );

  fd.append(
    "discountEnd",
    form.discountEnd || ""
  );

  // IMAGES
  images.forEach((img) => fd.append("images", img));

  const mutation = isEdit ? updateProduct : createProduct;

  mutation.mutate(
    isEdit ? { id: productId, data: fd } : fd,
    { onSuccess: () => navigate(-1) }
  );
};

  if (isEdit && isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      <PageHeader
        title={isEdit ? "Edit Product" : "Create Product"}
        subtitle="Manage products, pricing, stock & images"
        buttonText="Back"
        onClick={() => navigate(-1)}
      />

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* BASIC */}
        <SectionCard title="Basic Info">
          <div className="grid md:grid-cols-2 gap-4">

            <InputField
              label="Product Name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />

            <InputField
              label="Brand"
              value={form.brand}
              onChange={(e) => updateField("brand", e.target.value)}
            />

            <InputField
              label="SKU"
              value={form.sku}
              onChange={(e) => updateField("sku", e.target.value)}
            />

            <SelectField
              label="Category"
              value={form.categoryId}
              onChange={(e) => updateField("categoryId", e.target.value)}
              options={categories.map((c: any) => ({
                label: c.name,
                value: c.id,
              }))}
            />

          </div>

          <TextAreaField
            label="Description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </SectionCard>

        {/* PRICING */}
        <SectionCard title="Pricing & Inventory">
          <div className="grid md:grid-cols-4 gap-4">

            <InputField label="Price" type="number" value={form.price} onChange={(e) => updateField("price", e.target.value)} />
            <InputField label="Stock" type="number" value={form.stock} onChange={(e) => updateField("stock", e.target.value)} />
            <InputField label="Low Stock" type="number" value={form.lowStock} onChange={(e) => updateField("lowStock", e.target.value)} />

          </div>

          <div className="flex gap-6 mt-4">
            <label>
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => updateField("isFeatured", e.target.checked)}
              /> Featured
            </label>

            <label>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => updateField("isActive", e.target.checked)}
              /> Active
            </label>
          </div>
        </SectionCard>

        {/* IMAGES */}
        <SectionCard title="Images">
          <ImageUploader
            onChange={handleImages}
            images={preview}
            onRemove={removeImage}
          />
        </SectionCard>

        <SectionCard title="Discount (Optional)">

          <div className="grid md:grid-cols-2 gap-4">

            <SelectField
              label="Discount Type"
              value={form.discountType}
              onChange={(e) => updateField("discountType", e.target.value)}
              options={[
                { label: "No Discount", value: "" },
                { label: "Percentage", value: "PERCENTAGE" },
                { label: "Fixed", value: "FIXED" },
              ]}
            />

            <InputField
              label="Discount Value"
              type="number"
              value={form.discountValue}
              onChange={(e) => updateField("discountValue", e.target.value)}
            />

            <InputField
              label="Start Date"
              type="date"
              value={form.discountStart}
              onChange={(e) => updateField("discountStart", e.target.value)}
            />

            <InputField
              label="End Date"
              type="date"
              value={form.discountEnd}
              onChange={(e) => updateField("discountEnd", e.target.value)}
            />

          </div>

        </SectionCard>

        {/* SUBMIT */}
        <button className="w-full h-14 bg-black text-white rounded-2xl font-semibold">
          {isEdit ? "Update Product" : "Create Product"}
        </button>

      </form>
    </div>
  );
};

export default ProductForm;