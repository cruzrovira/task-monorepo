import { Router } from "express"

import {
  addUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "@/controllers/user.controller"

const userRouter = Router()
userRouter.get("/", getUsers)
userRouter.get("/:id", getUserById)
userRouter.post("/", addUser)
userRouter.delete("/:id", deleteUserById)
userRouter.put("/:id", updateUserById)

export default userRouter
