import { Task } from "@/models/task.model"
import { Schema, model } from "mongoose"
const CategorySchema = new Schema({
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

const Category = model("Category", CategorySchema)

export { Category }
