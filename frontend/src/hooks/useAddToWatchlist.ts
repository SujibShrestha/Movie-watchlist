import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovies } from "../api/api";

export const useAddToWatchlist = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => addMovies(token, payload),

    onSuccess: () => {
      // refresh watchlist automatically
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
};