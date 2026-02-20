import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/api";

interface LoginData {
  email: string;
  password: string;
}

interface UserResponse {
  user: { name: string; email: string };
  token: string;
}

export const useLogin = (options?: any) => {
  return useMutation<UserResponse, any, LoginData>({
    mutationFn: loginUser,
    ...options,
  });
};