import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import { xss } from "express-xss-sanitizer"

import connectDB from "./config/mongodb.js"
import errorHandler from "./middlewares/error-handler.js"
import notFound from "./middlewares/not-found.js"

import visitors from "./routers/visitors.js"
import feedbacks from "./routers/feedbacks.js"

const app = express()
const PORT = process.env.PORT || 5000

// security middlewares
app.use(helmet())
app.use(xss())

// parsing middleware
app.use(cookieParser())
app.use(express.json())

// console.log(process.env.FRONTEND_URL.split(","))
// CORS middleware
app.use(
  cors({ origin: process.env.FRONTEND_URL.split(","), credentials: true }),
)

// routers
app.use("/api/v1/visitors", visitors)
app.use("/api/v1/feedbacks", feedbacks)

// error handling middleware
app.use(notFound)
app.use(errorHandler)

// connect to database
await connectDB(process.env.MONGODB_CONNECTION_URL)
console.log("Connected to MongoDB")

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
