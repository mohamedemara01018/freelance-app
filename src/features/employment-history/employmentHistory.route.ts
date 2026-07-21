import { Router } from "express";
import * as employmentHistoryController from "./employmentHistory.controller.js";

const router = Router();

// ==========================================
// Employment History Routes
// ==========================================

// GET  /api/v1/employment-history - Get all entries (or filter by ?profileId=...)
// POST /api/v1/employment-history - Create a new entry
router
    .route("/")
    .get(employmentHistoryController.getAllEmploymentHistories)
    .post(employmentHistoryController.createEmploymentHistory);

// PATCH  /api/v1/employment-history/:id - Edit entry by ID
// DELETE /api/v1/employment-history/:id - Delete entry by ID
router
    .route("/:id")
    .patch(employmentHistoryController.editEmploymentHistory)
    .delete(employmentHistoryController.deleteEmploymentHistory);

export default router;