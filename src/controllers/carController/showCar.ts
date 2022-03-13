import type { Request, Response } from "express"
import { type WithId, ObjectId } from "mongodb"

import { collections } from "../../database"
import type { Car } from "../../types"

const processId = (id: string) => {
  if (!ObjectId.isValid(id)) return undefined

  const newId = new ObjectId(id)

  return newId.toString() === id ? newId : undefined
}

interface ResponseCar extends WithId<Omit<Car, "images">> {
  images: string[]
}

const showCar = async (req: Request, res: Response<ResponseCar>) => {
  const id = processId(req.params.id)

  if (id) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const databaseCar = await collections.cars.findOne({ _id: id })

    if (databaseCar) {
      const car = {
        ...databaseCar,
        images: databaseCar.images.map((image) => image.toString()),
      }
      res.json(car)
    } else res.sendStatus(404)
  } else res.sendStatus(400)
}

export default showCar
