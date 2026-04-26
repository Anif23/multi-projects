import { useQuery } from "@tanstack/react-query";
import { userAPI } from "../../api/user";
import { qk } from "../../utils/queryKeys";

export const useProducts = (params?: any) =>
  useQuery({
    queryKey: [qk.userProducts, params],
    queryFn: () => userAPI.products(params).then(r => r.data.data),
  });

export const useProduct = (id: number) =>
  useQuery({
    queryKey: [qk.orders, id],
    queryFn: () => userAPI.product(id).then(r => r.data.data),
    enabled: !!id,
  });

export const useCategories = (params?: any) =>
  useQuery({
    queryKey: [qk.userCategories, params],
    queryFn: () => userAPI.categories(params).then(r => r.data.data),
  });