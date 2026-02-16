import express from "express"
import corsOptions from "./config/cors.js"
import cors from 'cors'
import { prisma } from "./config/db.js"
import { config } from "dotenv"
config()

const app = express()
const PORT = process.env.PORT || 3000

//Middlewares
app.use(express.json())
app.use(cors(corsOptions))

app.get("/",(req,res)=>{
    res.send("Api is running")
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})