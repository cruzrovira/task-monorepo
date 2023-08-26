import "dotenv/config"

import cors from "cors"
import express, { type Response } from "express"
import { connection } from "mongoose"
import morgan from "morgan"

import routerCategories from "@/routes/category.route"
import taskRouter from "@/routes/task.route"
import { initialConnectDB } from "@/service/mongoose.service"

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.disable("x-powered-by")

initialConnectDB()

app.use("/api/categories", routerCategories)
app.use("/api/task", taskRouter)

app.use((_req, res: Response) => {
  res.status(404).json({ error: "Not found" })
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`)
})

process.on("SIGINT", () => {
  connection
    .close()
    .then(() => {
      console.log("Mongoose disconnected on app termination")
      process.exit(0)
    })
    .catch(err => {
      console.log("Mongoose disconnected on app termination with error", err)
      process.exit(1)
    })
})
