import "dotenv/config"

import cors from "cors"
import express from "express"

import { connectToDatabase } from "./database"
import routes from "./routes"

const port = process.env.PORT ?? 5000

const app = express()

app.use(cors())
app.use(express.json({ limit: "15mb" }))

app.use(routes)

app.listen(port, () => {
  void connectToDatabase()

  console.log(`Server is running on port: ${port}`)
})
