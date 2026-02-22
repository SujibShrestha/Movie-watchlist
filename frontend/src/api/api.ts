import axios from "axios";
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

export const addMovies = async (token: string, data:any) => {
  const res = await api.post("/watchlist",data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
console.log(res)
  return res.data.data; 
};

export const removeMovie = async (token: string,id:number) => {
  const res = await api.delete(`/watchlist/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); 

  return res.data.data; 
};

export const UpdateStatusMovie =async (token: string,id:number, data:WatchlistParams) => {
  console.log(data)
  const res = await api.patch(`/watchlist/${id}`,data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); 

  return res.data.data; 
};