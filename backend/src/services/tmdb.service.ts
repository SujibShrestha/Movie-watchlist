import axios, { type AxiosResponse } from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

export async function fetchTrendingMovies() {
  try {
    const res:AxiosResponse = await axios.get(`${BASE_URL}/trending/movie/day`, {
      params: { api_key: TMDB_API_KEY },
    });
    return res.data.results;
  } catch (err) {
    console.error("TMDB API error:", err);
    throw new Error("Failed to fetch trending movies");
  }
}