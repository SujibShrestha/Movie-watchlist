import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeMovie } from "../api/api";

export const useRemove = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => removeMovie(token,id),

    onSuccess: () => {
      // refresh watchlist automatically
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
};