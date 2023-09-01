import { type Request, type Response } from "express"

import { User } from "@/models/user.model"

const addUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, picture } = req.body
  const user = new User({ name, email, picture })
  try {
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}).populate("tasks", "title completed -_id")
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json(error)
  }
}
const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const user = await User.findById(id).populate(
      "tasks",
      "title completed -_id",
    )
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}

const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const user = await User.findByIdAndDelete(id)

    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { name, email, picture } = req.body
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, picture },
      { new: true },
    ).populate("tasks", "title completed -_id")

    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}

export { addUser, deleteUserById, getUserById, getUsers, updateUserById }
