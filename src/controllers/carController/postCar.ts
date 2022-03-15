import type { Request, Response } from "express"
import { validate } from "jsonschema"
import { Binary } from "mongodb"
import validator from "validator"
import DOMPurify from "isomorphic-dompurify"

import type { Car, Category } from "../../types"
import { collections } from "../../database"
import { sanitizeAndFormat } from "../../helpers"

const { isBase64 } = validator

interface Body {
  category: Category
  details: {
    body: string
    title: string
  }[]
  images: string[]
  price: number
  title: string
}

const bodySchema = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  additionalProperties: false,

  properties: {
    category: { enum: ["new", "seminew", "utility"] },

    details: {
      items: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        additionalProperties: false,

        properties: {
          body: {
            minLength: 1,
            type: "string",
          },

          title: {
            minLength: 1,
            type: "string",
          },
        },

        required: ["body", "title"],
      },

      type: "array",
    },

    images: {
      items: {
        minLength: 1,
        type: "string",
      },

      minItems: 1,

      type: "array",
    },

    price: {
      minimum: 1,
      type: "integer",
    },

    title: {
      minLength: 1,
      type: "string",
    },
  },

  required: ["category", "details", "images", "price", "title"],
  type: "object",
}

const isBodyValid = (body: unknown): body is Body =>
  validate(body, bodySchema).valid

const isImageValid = (image: string) => {
  const [data, mime, base64, content] = image.split(/[,:;]/u)

  return (
    data === "data" &&
    mime.startsWith("image") &&
    base64 === "base64" &&
    isBase64(content)
  )
}

const processCar = (reqBody: unknown): Car | undefined => {
  if (!isBodyValid(reqBody)) return undefined

  const { category, details, images, price, title } = reqBody

  if (!images.every(isImageValid)) return undefined

  return {
    category,
    date: Date.now(),

    details: details.map(({ body, title: detailTitle }) => ({
      body: sanitizeAndFormat(body),
      title: sanitizeAndFormat(detailTitle),
    })),

    images: images.map((image) => new Binary(DOMPurify.sanitize(image))),
    price,
    title: sanitizeAndFormat(title),
  }
}

const postCar = async (req: Request, res: Response<string>) => {
  const car = processCar(req.body)

  if (car) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { acknowledged } = await collections.cars.insertOne(car)

    if (acknowledged) res.sendStatus(201)
    else res.sendStatus(500)
  } else res.sendStatus(400)
}

export default postCar
