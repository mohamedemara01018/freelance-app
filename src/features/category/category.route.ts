import { Router } from "express";
import * as categoryController from "./category.controller.js";

const router = Router();

// ==========================================
// Category Routes
// ==========================================

// GET  /api/v1/categories - Get all categories (or filter via ?search=...)
// POST /api/v1/categories - Create a new category
router
    .route("/")
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory);

// GET    /api/v1/categories/:id - Get single category by ID
// PATCH  /api/v1/categories/:id - Edit category by ID
// DELETE /api/v1/categories/:id - Delete category by ID
router
    .route("/:id")
    .get(categoryController.getCategoryById)
    .patch(categoryController.editCategory)
    .delete(categoryController.deleteCategory);

export default router;