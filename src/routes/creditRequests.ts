import { Router } from "express"

import postCreditRequest from "../controllers/creditRequestsController/postCreditRequest"

const routes = Router()

routes.route("/creditRequest").post(postCreditRequest)

export default routes
