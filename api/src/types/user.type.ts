import { type Types } from "mongoose"
export interface IUser {
  id?: Types.ObjectId | undefined
  name: string
  email: string
  picture: string
  tasks?: Types.ObjectId[]
}
