import { useQuery } from "@tanstack/react-query";
import { getWatchlist } from "../api/api";

export const useWatchlist = (
  token: string,
  status?: "" | "WATCHED" | "NOT_WATCHED"
) => {
  return useQuery({
    queryKey: ["watchlist", status], // include status in key for caching
    queryFn: () => getWatchlist(token, { status }), // <-- wrap in function
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};