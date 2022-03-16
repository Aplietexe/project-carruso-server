import type { Request, Response } from "express"
import { validate } from "jsonschema"
import validator from "validator"

import { collections } from "../../database"
import { sanitizeAndFormat } from "../../helpers"
import type { CreditRequest } from "../../types"

const { isEmail, isMobilePhone } = validator

interface Body extends Omit<CreditRequest, "monthlyIncome"> {
  monthlyIncome: string
}

const bodySchema = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  additionalProperties: false,

  properties: {
    address: { type: "string" },
    answerMethod: { type: "string" },

    creditBureauStatus: {
      enum: [
        "No tengo Historial de Crédito",
        "Tengo Buen historial",
        "Tengo Historial regular",
      ],
    },

    email: { type: "string" },
    maternalSurname: { type: "string" },
    monthlyIncome: { type: "string" },
    name: { type: "string" },
    paternalSurname: { type: "string" },
    phone: { type: "string" },
    proofOfIncome: { enum: ["Estados de cuenta", "Recibos de nomina"] },
    reference2Name: { type: "string" },
    reference2Phone: { type: "string" },
    referenceName: { type: "string" },
    referencePhone: { type: "string" },
    rfc: { type: "string" },
  },
}

const isBodyValid = (body: unknown): body is Body =>
  validate(body, bodySchema).valid

const processCreditRequest = (body: unknown): CreditRequest | undefined => {
  if (!isBodyValid(body)) return undefined

  const formatted = {
    address: sanitizeAndFormat(body.address),
    email: sanitizeAndFormat(body.email),
    maternalSurname: sanitizeAndFormat(body.maternalSurname),
    monthlyIncome: Number(sanitizeAndFormat(body.monthlyIncome)),
    name: sanitizeAndFormat(body.name),
    paternalSurname: sanitizeAndFormat(body.paternalSurname),
    phone: sanitizeAndFormat(body.phone),
    reference2Name: sanitizeAndFormat(body.reference2Name),
    reference2Phone: sanitizeAndFormat(body.reference2Phone),
    referenceName: sanitizeAndFormat(body.referenceName),
    referencePhone: sanitizeAndFormat(body.referencePhone),
    rfc: sanitizeAndFormat(body.rfc),
  }

  const { email, phone, reference2Phone, referencePhone } = formatted

  if (
    !(
      isEmail(email) &&
      isMobilePhone(phone) &&
      isMobilePhone(reference2Phone) &&
      isMobilePhone(referencePhone)
    )
  )
    return undefined

  return { ...body, ...formatted }
}

const postCreditRequest = async (req: Request, res: Response) => {
  const creditRequest = processCreditRequest(req.body)

  if (creditRequest) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { acknowledged } = await collections.creditRequests.insertOne(
      creditRequest,
    )

    if (acknowledged) res.sendStatus(201)
    else res.sendStatus(500)
  } else res.sendStatus(400)
}

export default postCreditRequest
