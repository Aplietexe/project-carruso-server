import { Router } from "express"

import {
  deleteCar,
  listCars,
  postCar,
  showCar,
} from "../controllers/carController"
import addId from "../middleware/addId"

const routes = Router()

routes.route("/cars").get(listCars)

routes.route("/car").post(postCar)

routes.use("/car/:id", addId)

routes.route("/car/:id").get(showCar).delete(deleteCar)

export default routes
