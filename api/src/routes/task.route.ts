import { Router } from "express"

import {
  addTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from "@/controllers/task.controller"
const taskRouter = Router()

taskRouter.get("/", getTasks)
taskRouter.get("/id/:id", getTaskById)
taskRouter.post("/", addTask)
taskRouter.delete("/id/:id", deleteTaskById)
taskRouter.put("/id/:id", updateTaskById)

export default taskRouter
