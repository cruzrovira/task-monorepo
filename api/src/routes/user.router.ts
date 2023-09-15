import { Router } from "express"

import {
  addUser,
  deleteUserById,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUserById,
} from "@/controllers/user.controller"

const userRouter = Router()
userRouter.get("/", getUsers)
userRouter.get("/id/:id", getUserById)
userRouter.get("/email/:email", getUserByEmail)
userRouter.post("/", addUser)
userRouter.delete("/id/:id", deleteUserById)
userRouter.put("/id/:id", updateUserById)

export default userRouter
