import { Schema, model } from "mongoose"

import { Task } from "@/models/task.model"
import { type IUser } from "@/types/user.type"

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
})

UserSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getQuery())
  await Task.deleteMany({ user: user._id })
  next()
})

UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

const User = model("User", UserSchema)

export { User }
