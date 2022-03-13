import { Router } from "express"

import { listCars, postCar, showCar } from "../controllers/carController"

const routes = Router()

routes.route("/cars").get(listCars)

routes.route("/car").post(postCar)

routes.route("/car/:id").get(showCar)

export default routes
