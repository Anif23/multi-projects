import { useQuery } from "@tanstack/react-query";
import { userAPI } from "../../api/user";
import { qk } from "../../utils/queryKeys";

export const useProducts = (params?: any) => {
  return useQuery({
    queryKey: [qk.userProducts, params],

    queryFn: async () => {
      const res = await userAPI.products(params);

      return res.data;
    },
  });
};

export const useProduct = (id: number) =>
  useQuery({
    queryKey: qk.product(id),

    queryFn: () => userAPI.product(id).then((r) => r.data.data),

    enabled: !!id,
  });

export const useCategories = (params?: any) =>
  useQuery({
    queryKey: [qk.userCategories, params],

    queryFn: () => userAPI.categories(params).then((r) => r.data.data),
  });
