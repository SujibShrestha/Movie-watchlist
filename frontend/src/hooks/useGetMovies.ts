import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/api";

export const useGetMovies = (page = 1,query:string) => {
  return useQuery({
    queryKey: ["movies", page,query], // cache per page
    queryFn: () => getMovies(page,query),

    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    placeholderData: (previousData) => previousData, // smooth pagination
  });
};