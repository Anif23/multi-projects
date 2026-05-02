import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userAPI } from "../../api/user";
import { qk } from "../../utils/queryKeys";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { useAuthStore } from "../../store/authStore";

export const useCart = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: qk.cart,
    queryFn: async () => {
      const res = await userAPI.cart();
      return res.data.data;
    },
    enabled: !!token,
  });
};

export const useAddToCart = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => userAPI.addToCart(data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.cart });
    },

    onError: (err: any) => {
      toast.error(getErrorMessage(err));
    },
  });
};

export const useUpdateCart = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => userAPI.updateCart(id, data),

    onSuccess: () => {
      toast.success("Cart updated");
      qc.invalidateQueries({ queryKey: qk.cart });
    },

    onError: (err: any) => {
      toast.error(getErrorMessage(err));
    },
  });
};

export const useRemoveCart = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userAPI.removeCart(id),

    onSuccess: () => {
      toast.success("Item removed ❌");
      qc.invalidateQueries({ queryKey: qk.cart });
    },

    onError: (err: any) => {
      toast.error(getErrorMessage(err));
    },
  });
};
