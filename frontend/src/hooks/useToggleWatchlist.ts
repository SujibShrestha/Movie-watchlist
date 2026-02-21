import { useSelector } from "react-redux";
import { useAddToWatchlist } from "./useAddToWatchlist";
import { useRemove } from "./useRemoveMovie";
import type { RootState } from "../store/store";

export const useToggleWatchlist = (token: string) => {
  const { mutate: addMovie, isPending: isAdding } = useAddToWatchlist(token);
  const { mutate: removeMovie, isPending: isRemoving } =
    useRemove(token);
 const user = useSelector((state:RootState)=>state.auth)
  const toggleWatchlist = (
    movie: any,
    isInWatchlist: boolean,
    watchlistId?: number
  ) => {
    if (isInWatchlist && watchlistId) {
      // remove
      removeMovie(watchlistId);
    } else {
      // add
   
      const payload = {
        userId : user.user?.id,
        tmdbId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
        overview: movie.overview,
        originalLanguage: movie.original_language,
      };

      addMovie(payload);
    }
  };

  return {
    toggleWatchlist,
    isLoading: isAdding || isRemoving,
  };
};