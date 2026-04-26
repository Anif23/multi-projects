import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userAPI } from "../../api/user";

export const useMergeCart = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (items: any[]) =>
      userAPI.mergeCart(items),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useMergeWishlist = () => {
  return useMutation({
    mutationFn: (items: any[]) =>
      userAPI.mergeWishlist(items),
  });
};