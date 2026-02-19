import type { Request, Response } from "express";
import { fetchMoviesFromTMDB, fetchMovieById } from "../services/tmdb.service.js";

export async function getTrendingMovies(req:Request, res:Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const sort_by = (req.query.sort_by as string) || "popularity.desc";
    const movies = await fetchMoviesFromTMDB({page,sortBy:sort_by});
    res.json(movies);
  } catch (err:unknown) {
    res.status(500).json({ error: err });
  }
}

export async function getMovie(req:Request, res:Response) {
  try {
    const movieId = parseInt(req.params.id as string);
    if (isNaN(movieId)) {
      res.status(400).json({ error: "Invalid movie ID" });
      return;
    }
    const movie = await fetchMovieById(movieId);
    res.json(movie);
  } catch (err:unknown) {
    res.status(500).json({ error: err });
  }
}