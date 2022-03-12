import { type MongoClientOptions, type Db, MongoClient } from "mongodb"

import type { Car } from "./types"

let database: Db | undefined

const connectToDatabase = async () => {
  const uri = process.env.MONGO_URI

  if (uri === undefined) {
    console.error("Error connecting to database")
    return
  }

  const options = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    useNewUrlParser: true,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    useUnifiedTopology: true,
  } as MongoClientOptions

  const client = await MongoClient.connect(uri, options)

  database = client.db("carrusodb")

  console.log("Successfully connected to MongoDB.")
}

const getDatabase = () => {
  if (!database) throw new Error("Error retrieving database connection")

  return database
}

const collections = {
  get cars() {
    return getDatabase().collection<Car>("cars")
  },
}

export { connectToDatabase, getDatabase, collections }
