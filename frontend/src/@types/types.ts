
export interface User {
  id: number;
  email: string;
  name?: string | null;
  password: string;
  avatar?: string | null;
  watchlist?: Watchlist[];
  createdAt: Date;
}

export interface Movie {
  id: number;
  title: string;
  overview?: string | null;
  posterPath?: string | null;
  originalLanguage?: string | null;
  voteAverage?: number | null;
  createdAt: Date;
  status: MovieStatus;
  watchlists: Watchlist[];
}

export const MovieStatus = {
  NOT_WATCHED: "NOT_WATCHED",
  WATCHED: "WATCHED",
} as const;

export type MovieStatus = typeof MovieStatus[keyof typeof MovieStatus];

export interface Watchlist {
  id: number;
  userId: number;
  tmdbId: number;
  title: string;
  overview?: string | null;
  posterPath?: string | null;
  originalLanguage?: string | null;
  voteAverage?: number | null;

  // watch state
  status: MovieStatus;

  addedAt: Date;
  createdAt: Date;

  // optional relation when using include()
  user?: User;
}

export const genreMap: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};