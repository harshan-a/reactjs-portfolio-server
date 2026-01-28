import express from "express"

import { createOrUpdateVisitor } from "../controllers/visitors.js"

const router = express.Router()

router.route("/").post(createOrUpdateVisitor)

export default router
