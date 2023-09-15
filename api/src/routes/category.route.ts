import { Router } from "express"

import {
  addCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategory,
} from "@/controllers/category.controller"
const routerCategories = Router()

routerCategories.get("/", getCategories)
routerCategories.get("/id/:id", getCategoryById)
routerCategories.post("/", addCategory)
routerCategories.put("/id/:id", updateCategory)
routerCategories.delete("/id/:id", deleteCategoryById)

export default routerCategories
