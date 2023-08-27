import { Schema, model } from "mongoose"

import { Task } from "@/models/task.model"
import { type ICategory } from "@/types/category.type"

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
})

CategorySchema.pre("findOneAndDelete", async function (next) {
  const category = await this.model.findOne(this.getQuery())
  await Task.deleteMany({ category: category._id })
  next()
})

CategorySchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

const Category = model<ICategory>("Category", CategorySchema)

export { Category }
