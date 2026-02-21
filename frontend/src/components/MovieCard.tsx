import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Star } from "lucide-react";

const IMAGE_BASE = import.meta.env.VITE_TMDB_BASE_URL;

interface MovieCardProps {
  movie: any;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border-border/50 bg-card/60 backdrop-blur hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={`${IMAGE_BASE}${movie.posterPath || movie.poster_path}`}
            alt={movie.title}
            className="aspect-2/3 w-full object-cover"
          />

          {/* rating badge */}
          <Badge className="absolute bottom-3 left-3 bg-background/80 backdrop-blur">
            <Star/> { movie.voteAverage || movie.vote_average.toFixed(1)}
          </Badge>
        </div>

        <div className="p-4 space-y-1">
          <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
          <p className="text-sm text-muted-foreground">
            {movie.release_date?.slice(0, 4)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}