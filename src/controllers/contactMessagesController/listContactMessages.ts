import type { Request, Response } from "express"

import { collections } from "../../database"

const listContactMessages = async (req: Request, res: Response) => {
  const messages = await collections.contactMessages.find({}).toArray()

  res.json(messages)
}

export default listContactMessages
