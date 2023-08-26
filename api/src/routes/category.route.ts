import {
  addCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategory,
} from "@/controllers/category.controller"
import { Router } from "express"
const routerCategories = Router()

routerCategories.get("/", getCategories)
routerCategories.get("/:id", getCategoryById)
routerCategories.post("/", addCategory)
routerCategories.put("/:id", updateCategory)
routerCategories.delete("/:id", deleteCategoryById)

export default routerCategories
