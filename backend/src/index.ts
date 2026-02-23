import express, { type Request, type Response } from "express"
import corsOptions from "./config/cors.js"
import cors from 'cors'
import { prisma } from "./config/db.js"
import { config } from "dotenv"
import movieRoutes from "./routes/movies.route.js"
import authRoutes from "./routes/auth.route.js"
import watchlistRoutes from "./routes/watchlist.route.js"
import { authorize } from "./middlewares/auth.middleware.js"
import { apiLimiter } from "./middlewares/rateLimit.middleware.js"
config()

const app = express()
const PORT = process.env.PORT || 3000

//Middlewares
app.use(apiLimiter)
app.use(express.json())
app.use(cors(corsOptions))

//Routes
app.use("/api/v1/movies",movieRoutes)
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/watchlist",authorize,watchlistRoutes)

app.get("/",(req:Request,res:Response)=>{
    res.send("Api is running")
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})