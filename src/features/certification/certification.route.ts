import { Router } from "express";
import * as certificationController from "./certification.controller.js";

const router = Router();

// ==========================================
// Certification Routes
// ==========================================

// GET  /api/v1/certifications - Get all certifications (or filter by ?profileId=...)
// POST /api/v1/certifications - Create a new certification
router
    .route("/")
    .get(certificationController.getAllCertifications)
    .post(certificationController.createCertification);

// PATCH  /api/v1/certifications/:id - Edit certification by ID
// DELETE /api/v1/certifications/:id - Delete certification by ID
router
    .route("/:id")
    .patch(certificationController.editCertification)
    .delete(certificationController.deleteCertification);

export default router;