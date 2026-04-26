import { useQuery } from "@tanstack/react-query";
import { userAPI } from "../../api/user";
import { qk } from "../../utils/queryKeys";

export const useOrders = () =>
  useQuery({
    queryKey: qk.orders,
    queryFn: () => userAPI.orders().then(r => r.data.data),
  });

export const useOrder = (id: number) =>
  useQuery({
    queryKey: [qk.orders, id],
    queryFn: () => userAPI.order(id).then(r => r.data.data),
    enabled: !!id,
  });