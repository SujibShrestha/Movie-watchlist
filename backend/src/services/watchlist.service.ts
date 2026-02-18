import { prisma } from "../config/db.js";
import { ApiError } from "../helpers/ApiError.js";
import type { AddMovieInput } from "../validators/movie.validation.js";

export const addMovies = async (movieData: AddMovieInput) => {
  const {
    userId,
    tmdbId,
    title,
    overview,
    posterPath,
    originalLanguage,
    voteAverage,
  } = movieData;

  const existingMovie = await prisma.watchlist.findFirst({
    where: {
      userId,
      tmdbId,
    },
  });
  if (existingMovie) throw new ApiError(400, "Movies is already in watchlist");
  const newMovie = await prisma.watchlist.create({
    data: {
      userId,
      tmdbId,
      title,
      overview: overview ?? null,
      posterPath: posterPath ?? null,
      originalLanguage: originalLanguage ?? null,
      voteAverage: voteAverage ?? null,
      status: "NOT_WATCHED", // default status
    },
  });

  return newMovie;
};

export const getMovies = async (userId: number) => {
  try {
    const movies = await prisma.watchlist.findMany({ where: { userId },orderBy:{addedAt:"desc"} },);
    if(!movies) new ApiError(404,"No Movies found in this user's watchlist")
    
    return movies

  } catch (error:any) {
    throw new ApiError(404,error)
  }
};
