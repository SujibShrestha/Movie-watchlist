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

export enum MovieStatus {
  NOT_WATCHED = "NOT_WATCHED",
  WATCHED = "WATCHED",
}

export interface Watchlist {
  id: number;

  userId: number;
  movieId: number;

  addedAt: Date;

  // Relations (nested objects when included in queries)
  user?: User;
  movie?: Movie;
}
