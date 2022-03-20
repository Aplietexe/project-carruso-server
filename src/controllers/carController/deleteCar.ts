import type { Response } from "express"

import { collections } from "../../database"
import type { RequestWithId } from "../../types"

const deleteCar = async (req: RequestWithId, res: Response) => {
  if (!req.id) {
    res.sendStatus(400)
    return
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { acknowledged } = await collections.cars.deleteOne({ _id: req.id })

  if (acknowledged) res.sendStatus(204)
  else res.sendStatus(500)
}

export default deleteCar
