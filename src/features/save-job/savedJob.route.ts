import { Router } from "express";
import * as savedJobController from "./savedJob.controller.js";

const router = Router();

// ==========================================
// Saved Job Routes
// ==========================================

// GET  /api/v1/saved-jobs?user=USER_ID - Fetch saved jobs for a user
// POST /api/v1/saved-jobs               - Save a job
router
    .route("/")
    .get(savedJobController.getUserSavedJobs)
    .post(savedJobController.saveJob);

// POST /api/v1/saved-jobs/toggle - Easily toggle bookmark on/off from UI buttons
router
    .route("/toggle")
    .post(savedJobController.toggleSaveJob);

// DELETE /api/v1/saved-jobs/:id - Remove a saved job record by its document ID
router
    .route("/:id")
    .delete(savedJobController.unsaveJob);

export default router;