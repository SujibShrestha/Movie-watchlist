import axios, { type AxiosResponse } from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

export async function fetchMoviesFromTMDB({
  page = 1,
  sortBy = "popularity.desc",
  query = "",
}: {
  page?: number;
  sortBy?: string;
  query?: string;
}) {
  try {
    const limit: number = 20;
    const isSearching = query.trim().length > 0;
    const endpoint = isSearching ? "/search/movie" : "/discover/movie";
    
    const params: Record<string, any> = {
      api_key: TMDB_API_KEY,
      page,
    };
    if (isSearching) {
      params.query = query;
      params.include_adult = false;
    } else {
      params.sort_by = sortBy;
    }
    const res: AxiosResponse = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { api_key: TMDB_API_KEY, page, sort_by: sortBy,query },
    });
    const results = res.data.results.slice(0, limit);
     return {
      page: res.data.page,
      totalPages: res.data.total_pages,
      totalResults: res.data.total_results,
      results,
    };
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
