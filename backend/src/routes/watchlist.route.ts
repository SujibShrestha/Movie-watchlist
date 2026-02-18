import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { addToWatchlist, fetchMovies } from "../controllers/watchlist.controller.js";

const router:Router = Router()

router.post("/",addToWatchlist)

router.get("/",fetchMovies)

export default router