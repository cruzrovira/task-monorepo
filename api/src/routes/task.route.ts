import {
  addTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from "@/controllers/task.controller"
import { Router } from "express"
const taskRouter = Router()

taskRouter.get("/", getTasks)
taskRouter.get("/:id", getTaskById)
taskRouter.post("/", addTask)
taskRouter.delete("/:id", deleteTaskById)
taskRouter.put("/:id", updateTaskById)

export default taskRouter
