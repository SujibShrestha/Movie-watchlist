import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/api";

interface LoginData {
  email: string;
  password: string;
}

interface UserResponse {
  user: { id: number; name: string; email: string; avatar?: string | null; createdAt?: Date };
  token: string;
}

export const useLogin = (options?: any) => {
  return useMutation<UserResponse, any, LoginData>({
    mutationFn: loginUser,
    ...options,
  });
};