import { Router } from "express"

import carsRouter from "./cars"
import contactMessagesRouter from "./contactMessages"
import creditRequestsRoutes from "./creditRequests"

const router = Router()

router.use(carsRouter, contactMessagesRouter, creditRequestsRoutes)

export default router
