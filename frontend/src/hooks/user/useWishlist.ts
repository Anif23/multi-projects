// hooks/user/useWishlist.ts

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { userAPI } from "../../api/user";
import { qk } from "../../utils/queryKeys";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";

export const useWishlist = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: qk.wishlist,
    queryFn: async () => {
      const res = await userAPI.wishlist();
      return res.data.data;
    },
    enabled: !!token,
  });
};

export const useToggleWishlist = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) =>
      userAPI.toggleWishlist(productId),

    onMutate: async (productId) => {
      // instant UI update
      qc.setQueriesData(
        { queryKey: qk.userProducts },
        (old: any) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: old.data.map((p: any) =>
              p.id === productId
                ? {
                    ...p,
                    isWishlisted:
                      !p.isWishlisted,
                  }
                : p
            ),
          };
        }
      );
    },

    onSuccess: (res) => {
      toast.success(
        res?.data?.message ||
          "Wishlist updated ❤️"
      );

      qc.invalidateQueries({
        queryKey: qk.userProducts,
      });

      qc.invalidateQueries({
        queryKey: qk.wishlist,
      });

      qc.invalidateQueries({
        queryKey: qk.useProfile,
      });
    },

    onError: () => {
      toast.error(
        "Failed to update wishlist"
      );
    },
  });
};