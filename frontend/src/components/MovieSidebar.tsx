import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Star } from "lucide-react";
import { genreMap } from "../@types/types";

import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useToggleWatchlist } from "../hooks/useToggleWatchlist";
import { useWatchlist } from "../hooks/useGetWatchlist";
import { useUpdateStatus } from "../hooks/useUpdateStatus";
import { useState } from "react";

const IMAGE_BASE = import.meta.env.VITE_TMDB_BASE_URL;

interface MovieSidebarProps {
  movie: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MovieSidebar = ({
  movie,
  open,
  onOpenChange,
}: MovieSidebarProps) => {
  if (!movie) return null;
  const user = useSelector((state: RootState) => state.auth);
  const token = user.token!;


const { data: watchlist } = useWatchlist(token, "");
const { toggleWatchlist, isLoading } = useToggleWatchlist(token);
const existingMovie = watchlist?.data?.find(
  (m: any) => m.tmdbId === movie.tmdbId
);

const isInWatchlist = !!existingMovie;

const { mutate: updateStatus, isPending } = useUpdateStatus(token);
const [status,setStatus] = useState<string>("NOT_WATCHED")
const handleToggleWatched = (movie: any) => {
   const newStatus = status === "WATCHED" ? "NOT_WATCHED" : "WATCHED";
  setStatus(newStatus);

  updateStatus({
    id: movie.id,
    payload: { status: newStatus }, 
  });
};
  return (
    <div className="flex justify-end-safe items-center">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md w-full right-0 fixed top-0 h-full p-6 bg-background overflow-auto shadow-lg flex flex-col">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold">
              {movie.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {movie.releaseDate?.split("-")[0]} • {movie.runtime || "2h 49m"} •{" "}
              <span className="text-blue-400 font-semibold">
                {movie.voteAverage || movie.vote_average.toFixed(1)}
              </span>
            </DialogDescription>
          </DialogHeader>

          {/* Poster */}
          <img
            src={`${IMAGE_BASE}${movie.posterPath || movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />

          {/* Genres */}
          {movie.genre_ids && movie.genre_ids.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genre_ids.map((g: number) => {
                return (
                  <span
                    key={g}
                    className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                  >
                    {genreMap[g]?.toUpperCase() || "Unknown"}
                  </span>
                );
              })}
            </div>
          )}

          {/* Overview */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">
              Overview
            </h3>
            <p className="text-sm mt-2">{movie.overview}</p>
          </div>

          {/* IMDB Rating */}
          <div className="mt-6 flex items-center gap-2">
            <span className="text-xl font-bold">
             {Number(movie.voteAverage || movie.vote_average).toFixed(1)}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i <
                    Math.round(
                      movie.voteAverage || movie.vote_average.toFixed(1) / 2,
                    )
                      ? "text-yellow-400"
                      : "text-muted-foreground"
                  }
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-3">
           <Button
  onClick={() =>
    toggleWatchlist(movie, isInWatchlist, existingMovie?.id)
  }
  disabled={isLoading}
  variant={isInWatchlist ? "destructive" : "secondary"}
>
  {isLoading
    ? "Updating..."
    : isInWatchlist
    ? "Remove from Watchlist"
    : "Add to Watchlist"}
</Button>
           <Button
  variant={movie.status !== status ? "default" : "secondary"} // different style if already watched
  className="w-full"
  onClick={() => handleToggleWatched(movie)}
  disabled={isPending} // optional: disable while updating
>
  {movie.status !== "WATCHED" ?"Mark as Watched"  :"Watched ✓" }
</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
