import { Router } from "express"

import {
  listContactMessages,
  postContactMessage,
} from "../controllers/contactMessagesController"

const routes = Router()

routes.route("/contactMessage").post(postContactMessage)

routes.route("/contactMessages").get(listContactMessages)

export default routes
