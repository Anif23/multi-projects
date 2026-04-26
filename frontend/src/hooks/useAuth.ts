import { useMutation } from "@tanstack/react-query";
import api from "../api/client";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    }
  });
};