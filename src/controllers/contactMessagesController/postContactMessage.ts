import type { Request, Response } from "express"
import { validate } from "jsonschema"
import validator from "validator"

import { collections } from "../../database"
import { sanitizeAndFormat } from "../../helpers"
import type { ContactMessage } from "../../types"

const { isEmail, isMobilePhone } = validator

const bodySchema = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  additionalProperties: false,

  properties: {
    email: { type: "string" },
    message: { type: "string" },
    name: { type: "string" },
    phone: { type: "string" },
  },
}

const isBodyValid = (body: unknown): body is ContactMessage =>
  validate(body, bodySchema).valid

const format = (body: ContactMessage): ContactMessage => {
  const formatted: Partial<ContactMessage> = {}

  for (const key in body) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      const typedProperty = key as keyof typeof body

      formatted[typedProperty] = sanitizeAndFormat(body[typedProperty])
    }
  }

  return formatted as ContactMessage
}

const processContactMessage = (body: unknown): ContactMessage | undefined => {
  if (!isBodyValid(body)) return undefined

  const formatted = format(body)

  const { email, phone } = formatted

  if (!isEmail(email) || !isMobilePhone(phone)) return undefined

  return formatted
}

const postContactMessage = async (req: Request, res: Response) => {
  const contactMessage = processContactMessage(req.body)

  if (contactMessage) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { acknowledged } = await collections.contactMessages.insertOne(
      contactMessage,
    )

    if (acknowledged) res.sendStatus(201)
    else res.sendStatus(500)
  } else res.sendStatus(400)
}

export default postContactMessage
