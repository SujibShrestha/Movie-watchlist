import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { ApiError } from "../helpers/ApiError.js";
import { prisma } from "../config/db.js";

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return res.status(401).json(new ApiError(401,"Unauthorized"));

    const decoded = jwt.verify(token,process.env.JWT_SECRET!)
    console.log(decoded)
   
  } catch {}
};

