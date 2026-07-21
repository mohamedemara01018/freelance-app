import { Router } from "express";
import * as languageController from "./language.controller.js";
// import { protect } from "../../middlewares/auth.middleware.js"; // Optional: Add your authentication middleware here

const router = Router();

// ==========================================
// Language Routes
// ==========================================

// GET /api/v1/languages - Get all languages (or filter by ?profileId=...)
// POST /api/v1/languages - Create/add a new language
router
    .route("/")
    .get(languageController.getAllLanguages)
    .post(languageController.createLanguage);

// PATCH /api/v1/languages/:id - Update a language by its ID
// DELETE /api/v1/languages/:id - Delete a language by its ID
router
    .route("/:id")
    .patch(/* protect, */ languageController.editLanguage)
    .delete(/* protect, */ languageController.deleteLanguage);

export default router;