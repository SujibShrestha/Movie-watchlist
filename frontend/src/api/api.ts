import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // if using cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: LoginPayload) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface GetMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getMovies = async (page = 1) => {
  const res = await api.get(`/movies?page=${page}`);
  return res.data;
};

export interface WatchlistParams {
  status?: "" | "WATCHED" | "NOT_WATCHED";
}

export const getWatchlist = async (token: string, params?: WatchlistParams) => {
  const res = await api.get("/watchlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return res.data.data; 
};