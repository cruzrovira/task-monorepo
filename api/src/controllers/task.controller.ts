import { type Request, type Response } from "express"

import { Category } from "@/models/category.model"
import { Task } from "@/models/task.model"
import { User } from "@/models/user.model"

const addTask = async (req: Request, res: Response): Promise<void> => {
  const { title, completed, categoryId, userId } = req.body
  try {
    const category = await Category.findById(categoryId)
    const user = await User.findById(userId)

    const newTask = new Task({
      title,
      completed: Boolean(completed),
      category: category?._id,
      user: user?._id,
    })

    await newTask.save()
    category != null && (category.tasks = category.tasks.concat(newTask._id))
    await category?.save()
    user?.tasks != null && (user.tasks = user.tasks.concat(newTask._id))
    await user?.save()

    res.status(201).json(newTask)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({})
      .populate("category", "name -_id")
      .populate("user", "name email picture -_id")

    res.status(200).json(tasks)
  } catch (error) {
    res.status(400).json(error)
  }
}
const getTaskById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const task = await Task.findById(id)
      .populate("category", "name -_id")
      .populate("user", "name email picture -_id")

    res.status(200).json(task)
  } catch (error) {
    res.status(400).json(error)
  }
}

const deleteTaskById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const task = await Task.findByIdAndDelete(id)

    res.status(200).json(task)
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateTaskById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { title, completed, categoryId } = req.body
  try {
    const category = await Category.findById(categoryId)
    const task = await Task.findByIdAndUpdate(
      id,
      {
        title,
        completed: Boolean(completed),
        category: category?._id,
      },
      { new: true },
    )
      .populate("category", "name -_id")
      .populate("user", "name email picture -_id")

    res.status(200).json(task)
  } catch (error) {
    res.status(400).json(error)
  }
}

export { addTask, deleteTaskById, getTaskById, getTasks, updateTaskById }
