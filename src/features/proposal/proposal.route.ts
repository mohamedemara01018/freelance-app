import { Router } from "express";
import * as proposalController from "./proposal.controller.js";

const router = Router();

// ==========================================
// Proposal Routes
// ==========================================

// GET  /api/v1/proposals - Fetch proposals (?job=ID or ?freelancer=ID or ?status=pending)
// POST /api/v1/proposals - Submit a new proposal
router
    .route("/")
    .get(proposalController.getAllProposals)
    .post(proposalController.createProposal);

// GET    /api/v1/proposals/:id - Get proposal details (Auto-marks clientViewed = true)
// PATCH  /api/v1/proposals/:id - Change proposal status (accept, reject, shortlist)
// DELETE /api/v1/proposals/:id - Delete/withdraw proposal
router
    .route("/:id")
    .get(proposalController.getProposalById)
    .patch(proposalController.updateProposalStatus)
    .delete(proposalController.deleteProposal);

export default router;