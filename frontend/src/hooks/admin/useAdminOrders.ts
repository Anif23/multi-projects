import { useQuery } from "@tanstack/react-query";
import { adminAPI } from "../../api/admin";
import { qk } from "../../utils/queryKeys";

export const useAdminOrders = () =>
  useQuery({
    queryKey: qk.adminOrders,
    queryFn: () => adminAPI.orders().then(r => r.data.data)
  });