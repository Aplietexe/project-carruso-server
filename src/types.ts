import type { Binary } from "mongodb"

type Category = "new" | "seminew" | "utility"

interface Car {
  category: Category
  date: number
  details: {
    body: string
    title: string
  }[]
  images: Binary[]
  price: number
  title: string
}

export type { Category, Car }
