import { Router } from "express"

import { listCars, postCar, showCar } from "../controllers/carController"
import addId from "../middleware/addId"

const routes = Router()

routes.route("/cars").get(listCars)

routes.route("/car").post(postCar)

routes.use("/car/:id", addId)

routes.route("/car/:id").get(showCar)

export default routes
