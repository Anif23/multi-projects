import { useQuery } from "@tanstack/react-query";
import { adminAPI } from "../../api/admin";
import { qk } from "../../utils/queryKeys";

export const useAdminDashboard = () =>
  useQuery({
    queryKey: qk.adminDashboard,
    queryFn: () => adminAPI.dashboard().then(r => r.data.data)
  });