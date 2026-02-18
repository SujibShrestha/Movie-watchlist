import type { Request, Response } from "express";
import { ApiError } from "../helpers/ApiError.js";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { addMovies, getMovies } from "../services/watchlist.service.js";
import type { AddMovieInput } from "../validators/movie.validation.js";
import type { User } from "../generated/prisma/index.ts";

export const addToWatchlist = async (req: Request, res: Response) => {
  try {
    const movieData = req.body;
    const movie = await addMovies(movieData);
    if (!movie)
      res.status(400).json(new ApiError(400, "Error while adding movies"));

    return res
      .status(201)
      .json(
        new ApiResponse(201, movie, "Movie added in watchlist successfully"),
      );
  } catch (error: any) {
    throw new ApiError(400, error.message);
  }
};

export const fetchMovies = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw new ApiError(401, "Unauthorized");
    }
    const movies = await getMovies(userId);

    return res
      .status(200)
      .json(new ApiResponse(200, movies, "Watchlist fetched successfully"));
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(500, null, error.message || "Failed to fetch"));
  }
};
