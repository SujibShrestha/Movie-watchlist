import { Router } from "express";
import { addToWatchlist, deleteMovieFromWatchlist, fetchMovie, fetchMovies, updateMovieStatusController } from "../controllers/watchlist.controller.js";

const router:Router = Router()

router.post("/",addToWatchlist)

router.get("/",fetchMovies)

router.delete("/:id",deleteMovieFromWatchlist)

router.get('/:id',fetchMovie)

router.patch("/:id",updateMovieStatusController)

export default router