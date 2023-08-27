import { type Types } from "mongoose"
export interface ICategory {
  name: string
  tasks: Types.ObjectId[]
}
