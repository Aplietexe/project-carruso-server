import "dotenv/config"
import express from "express"
import cors from "cors"

import { connectToDatabase } from "./database"

const port = process.env.PORT ?? 5000

const app = express()

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  void connectToDatabase()

  console.log(`Server is running on port: ${port}`)
})
