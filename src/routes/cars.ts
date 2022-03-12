import { Router } from "express"

import { listCars, postCar } from "../controllers/carController"

const routes = Router()

routes.route("/cars").get(listCars)

routes.route("/car").post(postCar)

export default routes
