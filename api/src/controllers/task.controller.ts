import { type Request, type Response } from "express"

import { Category } from "@/models/category.model"
import { Task } from "@/models/task.model"

const addTask = async (req: Request, res: Response): Promise<void> => {
  const { title, completed, categoryId } = req.body
  try {
    const category = await Category.findById(categoryId)

    const newTask = new Task({
      title,
      completed: Boolean(completed),
      category: category?._id,
    })

    await newTask.save()
    category != null && (category.tasks = category.tasks.concat(newTask._id))
    await category?.save()

    res.status(201).json(newTask)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({}).populate("category", "name")
    res.status(200).json(tasks)
  } catch (error) {
    res.status(400).json(error)
  }
}
const getTaskById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const task = await Task.findById(id).populate("category", "name")

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
    ).populate("category", "name")

    res.status(200).json(task)
  } catch (error) {
    res.status(400).json(error)
  }
}

export { addTask, deleteTaskById, getTaskById, getTasks, updateTaskById }
