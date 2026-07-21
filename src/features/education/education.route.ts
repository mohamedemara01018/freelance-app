import { Router } from "express";
import * as educationController from "./education.controller.js";

const router = Router();

// ==========================================
// Education Routes
// ==========================================

// GET  /api/v1/education - Get all education entries (or filter by ?profileId=...)
// POST /api/v1/education - Create a new education entry
router
    .route("/")
    .get(educationController.getAllEducations)
    .post(educationController.createEducation);

// PATCH  /api/v1/education/:id - Edit education by ID
// DELETE /api/v1/education/:id - Delete education by ID
router
    .route("/:id")
    .patch(educationController.editEducation)
    .delete(educationController.deleteEducation);

export default router;