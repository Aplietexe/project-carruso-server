import type { Request, Response } from "express"
import type { Binary, Sort, WithId } from "mongodb"

import { collections } from "../../database"
import type { Car, Category } from "../../types"

type BaseCar = WithId<Pick<Car, "category" | "date" | "price" | "title">>

interface ProjectedCar extends BaseCar {
  image: Binary
}

interface ListedCar extends BaseCar {
  image: string
}

const isCategoryValid = (category: unknown): category is Category =>
  typeof category === "string" &&
  ["new", "seminew", "utility"].includes(category)

const project = {
  category: 1,
  date: 1,

  image: {
    $first: "$images",
  },

  price: 1,
  title: 1,
}

const mapCar = (car: ProjectedCar) => ({ ...car, image: car.image.toString() })

const sort: Sort = { date: -1 }

const listCars = async (req: Request, res: Response<ListedCar[]>) => {
  const { category } = req.query

  const filter = isCategoryValid(category) ? { category } : {}

  const cars = await collections.cars
    .find(filter)
    .project<ProjectedCar>(project)
    .map<ListedCar>(mapCar)
    .sort(sort)
    .toArray()

  res.json(cars)
}

export default listCars
