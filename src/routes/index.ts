import { Router } from "express"

import carsRouter from "./cars"
import contactMessagesRouter from "./contactMessages"

const router = Router()

router.use(carsRouter, contactMessagesRouter)

export default router
