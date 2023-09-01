import { type Types } from "mongoose"

export interface ITask {
  title: string
  completed: boolean
  category?: Types.ObjectId
  user: Types.ObjectId
}
