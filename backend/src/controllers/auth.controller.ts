import type { Request, Response } from "express";
import { ApiError } from "../helpers/ApiError.js";
import type { RegisterInput } from "../validators/user.validation.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import { ApiResponse } from "../helpers/ApiResponse.js";

export const login = async (req: Request, res: Response) => {
  try {
    const userdata: RegisterInput = req.body;

    const user = await loginUser(userdata);

  return res.status(201).json(
        new ApiResponse(200, user, "User Logged in Successfully")
    )
  } catch (error:any) {
    throw new ApiError(400,error.message,)
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const userdata: RegisterInput = req.body;

    const user = await registerUser(userdata);

  return res.status(201).json(
        new ApiResponse(200, user, "User registered Successfully")
    )
  } catch (error:any) {
    throw new ApiError(400,error.message,)
  }
};
