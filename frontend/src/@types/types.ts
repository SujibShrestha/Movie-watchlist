
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
