import { Prisma } from "../generated/prisma/index.js";
import type { Movie, MovieStatus, Watchlist } from "../@types/types.js";
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

export const getMovies = async (
  userId: number,
  page: number = 1,
  limit: number = 10,
  status?: MovieStatus,
) => {
  try {
    const safeLimit = Math.min(limit, 50);
    const safePage = Math.max(page, 1);
    const skip = (safePage - 1) * safeLimit;
    const whereClause:  Prisma.WatchlistWhereInput = { userId };

    if (status) {
      whereClause.status = status;
    }
    const movies = await prisma.watchlist.findMany({
      where: whereClause,
      orderBy: { addedAt: "desc" },
      skip,
      take: safeLimit,
    });

    const totalMovies = await prisma.watchlist.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(totalMovies / safeLimit);

    return {
      data: movies,
      pagination: {
        total: totalMovies,
        page: safePage,
        limit: safeLimit,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPreviousPage: safePage > 1,
      },
    };
  } catch (error: any) {
    throw new ApiError(404, error);
  }
};

export const deleteMovies = async (id: number, userId: number) => {
  try {
    const result = await prisma.watchlist.deleteMany({
      where: {
        id,
        userId,
      },
    });

    if (result.count === 0) {
      throw new ApiError(404, "Movie not found in your watchlist");
    }

    return { message: "Movie deleted successfully" };
  } catch (error: any) {
    throw new ApiError(500, "Failed to delete movie");
  }
};

export const getMovie = async (id: number, userId: number) => {
  try {
    const result = await prisma.watchlist.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!result) {
      throw new ApiError(404, "Movie not found in your watchlist");
    }

    return result;
  } catch (error: any) {
    throw new ApiError(500, "Failed to Fetch movie");
  }
};

export const updateMovie = async (
  id: number,
  userId: number,
  status: MovieStatus,
) => {
  try {
    const result = await prisma.watchlist.update({
      where: {
        id,
        userId,
      },
      data: {
        status,
      },
    });

    if (!result) {
      throw new ApiError(404, "Movie not found in your watchlist");
    }
    const updatedMovie = await prisma.watchlist.findFirst({
      where: { id, userId },
    });

    return updatedMovie;
  } catch (error: any) {
    throw new ApiError(500, "Failed to Update movie");
  }
};
