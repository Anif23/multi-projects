// hooks/user/useWishlist.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userAPI } from "../../api/user";
import { qk } from "../../utils/queryKeys";
import toast from "react-hot-toast";

export const useWishlist = () =>
  useQuery({
    queryKey: qk.wishlist,
    queryFn: () =>
      userAPI.wishlist().then((r) => r.data.data),
  });

export const useToggleWishlist = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) =>
      userAPI.toggleWishlist(productId),

    onMutate: async (productId) => {
      await qc.cancelQueries({ queryKey: qk.userProducts });

      const prev = qc.getQueryData(qk.userProducts);

      qc.setQueryData(qk.userProducts, (old: any) =>
        old?.map((p: any) =>
          p.id === productId
            ? { ...p, isWishlisted: !p.isWishlisted }
            : p
        )
      );

      return { prev };
    },

    onError: (_err, _vars, context) => {
      qc.setQueryData(qk.userProducts, context?.prev);
    },

    onSuccess: (res) => {
      toast.success(res?.data?.message || "Updated wishlist ❤️");

      qc.invalidateQueries({ queryKey: qk.userProducts });
      qc.invalidateQueries({ queryKey: qk.wishlist });
    },
  });
};