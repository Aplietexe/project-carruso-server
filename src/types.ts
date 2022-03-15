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

interface ContactMessage {
  email: string
  message: string
  name: string
  phone: string
}

export type { Category, Car, ContactMessage }
