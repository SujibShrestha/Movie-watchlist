import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateStatusMovie } from "../api/api";

export const useUpdateStatus = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      UpdateStatusMovie(token, id, payload),

    onSuccess: () => {
      // Refresh watchlist automatically
   
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
};
