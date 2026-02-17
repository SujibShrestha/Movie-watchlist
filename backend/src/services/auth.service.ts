import bcrypt from "bcrypt";
import { prisma } from "../config/db.js";
import { ApiError } from "../helpers/ApiError.js";
import type {
  LoginInput,
  RegisterInput,
} from "../validators/user.validation.js";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export const registerUser = async (userdata: RegisterInput) => {
  const { name, email, password, avatar } = userdata;

  if (!name || !email || !password) {
    throw new ApiError(400, "All Credentials are required");
  }
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }
  console.log("ram");
  const hashedPassword: string = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
      email,
      avatar: avatar ?? null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
  });

  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpires = process.env.JWT_EXPIRES || "7d";

  if (!jwtSecret) {
    throw new ApiError(500, "JWT_SECRET is not configured");
  }
  const payload = {
    id: newUser.id,
    email: newUser.email,
  };

  const token = jwt.sign(
    payload,
    jwtSecret as string,
    {
      expiresIn: jwtExpires,
    } as jwt.SignOptions,
  );

  return {
    user: newUser,
    token,
  };
};

export const loginUser = async (userdata: LoginInput) => {
  const { email, password }: { email: string; password: string } = userdata;
  if (!email || !password) {
    throw new ApiError(400, "All Credentials are required");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpires = process.env.JWT_EXPIRES || "7d";

  if (!jwtSecret) {
    throw new ApiError(500, "JWT_SECRET is not configured");
  }
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(
    payload,
    jwtSecret as string,
    {
      expiresIn: jwtExpires,
    } as jwt.SignOptions,
  );

  //Return safe user(never return password)
  const { password: _, ...safeUser } = user;

  return {
    user:safeUser,
    token
  };
};
