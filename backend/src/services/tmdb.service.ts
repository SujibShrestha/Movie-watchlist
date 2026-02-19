import axios, { type AxiosResponse } from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

export async function fetchMoviesFromTMDB({
  page = 1,
  sortBy = "popularity.desc", // default
}: {
  page?: number;
  sortBy?: string;
}) {
  try {
    const limit:number = 20
    const res: AxiosResponse = await axios.get(`${BASE_URL}/discover/movie`, {
      params: { api_key: TMDB_API_KEY, page, sort_by: sortBy },
    });
    const results = res.data.results.slice(0, limit);
    return results;
  } catch (err) {
    console.error("TMDB API error:", err);
    throw new Error("Failed to fetch trending movies");
  }
}

export async function fetchMovieById(movieId: number) {
  try {
    const res: AxiosResponse = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: { api_key: TMDB_API_KEY },
    });
    return res.data;
  } catch (err) {
    console.error("TMDB API error:", err);
    throw new Error(`Failed to fetch movie with ID ${movieId}`);
  }
}
