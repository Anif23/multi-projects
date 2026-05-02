import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userAPI } from "../../api/user";
import { qk } from "../../utils/queryKeys";
import { useAuthStore } from "../../store/authStore";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const useProfile = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: qk.useProfile,
    queryFn: async () => {
      const res = await userAPI.profile();
      return res.data.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateProfile = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: { username: string; email: string }) =>
      userAPI.updateProfile(data),

    onSuccess: (res) => {
      toast.success(res?.data?.message || "Profile updated successfully");

      qc.invalidateQueries({
        queryKey: qk.useProfile,
      });
    },

    onError: (err: any) => {
      toast.error(getErrorMessage(err));
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: { oldPassword: string; newPassword: string }) =>
      userAPI.changePassword(data),

    onSuccess: (res) => {
      toast.success(res?.data?.message || "Password updated successfully");
    },

    onError: (err: any) => {
      toast.error(getErrorMessage(err));
    },
  });
};
