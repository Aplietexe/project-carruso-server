import type { Response, NextFunction } from "express"
import { ObjectId } from "mongodb"

import type { RequestWithId } from "../types"

const processId = (id: string) => {
  if (!ObjectId.isValid(id)) return undefined

  const newId = new ObjectId(id)

  return newId.toString() === id ? newId : undefined
}

const addId = (req: RequestWithId, res: Response, next: NextFunction) => {
  const id = processId(req.params.id)
  if (id) {
    req.id = id
    next()
  } else res.sendStatus(400)
}

export default addId
