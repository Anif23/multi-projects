// hooks/admin/useAdminProducts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "../../api/admin";
import { qk } from "../../utils/queryKeys";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const useAdminProducts = () =>
  useQuery({
    queryKey: qk.adminProducts,
    queryFn: () => adminAPI.products().then((r) => r.data.data),
  });

export const useAdminProductDetail = (id: number) =>
  useQuery({
    queryKey: [qk.orders, id],
    queryFn: () => adminAPI.product(id).then((r) => r.data.data),
    enabled: !!id,
  });

export const useCreateProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => adminAPI.createProduct(data),

    onSuccess: () => {
      toast.success("Product Created Successfully");
      qc.invalidateQueries({ queryKey: qk.adminProducts });
    },

    onError: (err: any) => {
      toast.error(getErrorMessage(err));
    },
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => adminAPI.updateProduct(id, data),

    onSuccess: () => {
      toast.success("Product updated Successfully");
      qc.invalidateQueries({ queryKey: qk.adminProducts });
    },

    onError: (err: any) => {
      toast.error(getErrorMessage(err));
    },
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminAPI.deleteProduct(id),

    onSuccess: () => {
      toast.success("Product Deleted ❌");
      qc.invalidateQueries({ queryKey: qk.adminProducts });
    },

    onError: (err: any) => {
      toast.error(getErrorMessage(err));
    },
  });
};
