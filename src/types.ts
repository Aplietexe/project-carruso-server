import type { Request } from "express"
import type { Binary, ObjectId } from "mongodb"

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

type ProofOfIncome = "Estados de cuenta" | "Recibos de nomina"

type CreditBureauStatus =
  | "No tengo Historial de Crédito"
  | "Tengo Buen historial"
  | "Tengo Historial regular"

type AnswerMethod = "Correo / Email" | "WhatsApp"

interface CreditRequest {
  address: string
  answerMethod: AnswerMethod
  creditBureauStatus: CreditBureauStatus
  email: string
  maternalSurname: string
  monthlyIncome: number
  name: string
  paternalSurname: string
  phone: string
  proofOfIncome: ProofOfIncome
  reference2Name: string
  reference2Phone: string
  referenceName: string
  referencePhone: string
  rfc: string
}

interface RequestWithId extends Request {
  id?: ObjectId
}

export type { Category, Car, ContactMessage, CreditRequest, RequestWithId }
