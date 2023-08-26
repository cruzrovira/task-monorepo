import { type Request, type Response } from "express"

import { Category } from "../models/category.model"

const addCategory = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body
  try {
    const category = new Category({ name })
    const newCategory = await category.save()
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find({}).populate(
      "tasks",
      "title completed -_id",
    )

    res.status(200).json(categories)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const category = await Category.findById(id).populate(
      "tasks",
      "title completed -_id",
    )

    res.status(200).json(category)
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { name } = req.body
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    ).populate("tasks", "title completed -_id")

    res.status(200).json(updateCategory)
  } catch (error) {
    res.status(400).json(error)
  }
}

const deleteCategoryById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params
  try {
    const category = await Category.findByIdAndDelete(id)
    res.status(200).json(category)
  } catch (error) {
    res.status(400).json(error)
  }
}

export {
  addCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategory,
}
