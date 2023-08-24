import { Schema, model } from "mongoose"
import { Category } from "./category.model"
const TaskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
})

TaskSchema.pre("findOneAndDelete", async function (next) {
  const task = await this.model.findOne(this.getQuery())
  const category = await Category.findById(task.category)
  category &&
    (category.tasks = category.tasks.filter(
      t => t.toString() !== task._id.toString(),
    ))

  await category?.save()
})

TaskSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})
const Task = model("Task", TaskSchema)

export { Task }
