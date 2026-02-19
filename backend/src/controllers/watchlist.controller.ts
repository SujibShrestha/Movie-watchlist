import type { Request, Response } from "express";
import { ApiError } from "../helpers/ApiError.js";
import { ApiResponse } from "../helpers/ApiResponse.js";
import {
  addMovies,
  deleteMovies,
  getMovie,
  getMovies,
  updateMovie,
} from "../services/watchlist.service.js";
import type { AddMovieInput } from "../validators/movie.validation.js";
import type { User } from "../generated/prisma/index.ts";
import type { MovieStatus } from "../@types/types.js";

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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as MovieStatus;
    if (!userId) {
      throw new ApiError(401, "Unauthorized");
    }
    const movies = await getMovies(userId, page, limit, status);

    return res
      .status(200)
      .json(new ApiResponse(200, movies, "Watchlist fetched successfully"));
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(500, null, error.message || "Failed to fetch"));
  }
};

export const deleteMovieFromWatchlist = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const result = await deleteMovies(id, userId);

  res.status(200).json({
    success: true,
    ...result,
  });
};

export const fetchMovie = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.id;
    if (!userId) {
      throw new ApiError(401, "Unauthorized");
    }
    const movies = await getMovie(id, userId);

    return res
      .status(200)
      .json(new ApiResponse(200, movies, "Movie fetched successfully"));
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(500, null, error.message || "Failed to fetch"));
  }
};

export const updateMovieStatusController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const movie = await updateMovie(id, userId, status);

    return res.status(200).json({
      success: true,
      message: "Movie status updated successfully",
      data: movie,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
