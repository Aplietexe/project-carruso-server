import { Router } from "express"

import { postContactMessage } from "../controllers/contactMessagesController"

const routes = Router()

routes.route("/contactMessage").post(postContactMessage)

export default routes
