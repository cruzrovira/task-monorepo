import { type Types } from "mongoose"
export interface IUser {
  name: string
  email: string
  picture: string
  tasks?: Types.ObjectId[]
}