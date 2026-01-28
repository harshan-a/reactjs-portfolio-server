import express from "express"

import { createFeedback } from "../controllers/feedbacks.js"

const router = express.Router()

router.route("/").post(createFeedback)

export default router
