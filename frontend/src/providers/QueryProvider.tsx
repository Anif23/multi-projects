import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

export const QueryProvider = ({ children }: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};