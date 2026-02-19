import { Router } from "express";
import { getMovie, getTrendingMovies } from "../controllers/movie.controller.js";

const router = Router();

router.get("/",getTrendingMovies)

router.get("/:id",getMovie)

export default router