import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // if using cookies
  headers: {
    "Content-Type": "application/json",
  },
})

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export const registerUser = async(data:RegisterPayload)=>{
    const res = await api.post("/auth/register",data)
    return res.data
}

export const loginUser = async (data: LoginPayload) => {
  const res = await api.post("/auth/login", data)
  return res.data
}
export const logoutUser = async (data: LoginPayload) => {
  const res = await api.post("/auth/login", data)
  return res.data
}