import { Router } from "express";
import { getTrendingMovies } from "../controllers/movie.controller.js";

const router = Router();

router.get("/",getTrendingMovies)

export default router