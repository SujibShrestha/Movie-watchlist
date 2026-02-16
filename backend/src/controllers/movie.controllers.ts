import type { Request, Response } from "express";
import { fetchTrendingMovies } from "../services/tmdb.services.js";

export async function getTrendingMovies(req:Request, res:Response) {
  try {
    const movies = await fetchTrendingMovies();
    res.json(movies);
  } catch (err:unknown) {
    res.status(500).json({ error: err });
  }
}