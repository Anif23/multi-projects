import api from "./client";

export const adminAPI = {
  products: () => api.get("/admin/products"),
  product: (id: number) => api.get(`/admin/products/${id}`),
  createProduct: (data: FormData) => api.post("/admin/products", data),
  updateProduct: (id: number, data: FormData) =>
    api.put(`/admin/products/${id}`, data),
  deleteProduct: (id: number) => api.delete(`/admin/products/${id}`),

  categories: () => api.get("/admin/categories"),
  category: (id: number) => api.get(`/admin/categories/${id}`),
  createCategory: (data: FormData) => api.post("/admin/categories", data),
  updateCategory: (id: number, data: FormData) =>
    api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id: number) => api.delete(`/admin/categories/${id}`),

  orders: () => api.get("/admin/orders"),
  updateOrderStatus: (id: number, data: any) =>
    api.put(`/admin/orders/${id}/status`, data),
  updatePaymentStatus: (id: number, data: any) =>
    api.put(`/admin/orders/${id}/payment`, data),
};
