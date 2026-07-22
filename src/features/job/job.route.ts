import { Router } from "express";
import * as jobController from "./job.controller.js";

const router = Router();

// ==========================================
// Job Posting Routes
// ==========================================

// GET  /api/v1/jobs - Fetch jobs (Supports ?search= & ?category= & ?minBudget= & ?page=)
// POST /api/v1/jobs - Post a new job
router
    .route("/")
    .get(jobController.getAllJobs)
    .post(jobController.createJob);

// GET    /api/v1/jobs/:id - Get detailed view of single job
// PATCH  /api/v1/jobs/:id - Edit job details or update status (e.g. close job)
// DELETE /api/v1/jobs/:id - Remove job posting
router
    .route("/:id")
    .get(jobController.getJobById)
    .patch(jobController.editJob)
    .delete(jobController.deleteJob);

export default router;