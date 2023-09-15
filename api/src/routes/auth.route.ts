import { Router } from "express"

import { login, verifyToken } from "@/controllers/auth.controller"
const authRouter = Router()

authRouter.post("/login", login)
authRouter.post("/verify/token", verifyToken)
export { authRouter }
