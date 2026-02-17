import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),

  password: z
    .string()
    .min(8, "Password must be at least  characters")
    .max(100, "Password is too long"),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .optional(),

  avatar: z.string().url("Avatar must be a valid URL").optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
