import type { Response } from "express"
import type { WithId } from "mongodb"

import { collections } from "../../database"
import type { Car, RequestWithId } from "../../types"

interface ResponseCar extends WithId<Omit<Car, "images">> {
  images: string[]
}

const showCar = async (req: RequestWithId, res: Response<ResponseCar>) => {
  if (!req.id) {
    res.sendStatus(400)
    return
  }

  const databaseCar = await collections.cars.findOne({ _id: req.id })

  if (databaseCar) {
    const car = {
      ...databaseCar,
      images: databaseCar.images.map((image) => image.toString()),
    }
    res.json(car)
  } else res.sendStatus(404)
}

export default showCar
