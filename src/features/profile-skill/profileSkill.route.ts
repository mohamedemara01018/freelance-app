import { Router } from "express";
import * as profileSkillController from "./profileSkill.controller.js";

const router = Router();

// ==========================================
// Profile Skill Routes
// ==========================================

// GET  /api/v1/profile-skills - Get profile skills (Filterable: ?profileId=... & ?skillId=... & ?level=...)
// POST /api/v1/profile-skills - Link a skill to a profile
router
    .route("/")
    .get(profileSkillController.getProfileSkills)
    .post(profileSkillController.createProfileSkill);

// GET    /api/v1/profile-skills/:id - Get single entry
// PATCH  /api/v1/profile-skills/:id - Update entry (e.g., experience years, level, isPrimary)
// DELETE /api/v1/profile-skills/:id - Remove skill from profile
router
    .route("/:id")
    .get(profileSkillController.getProfileSkillById)
    .patch(profileSkillController.editProfileSkill)
    .delete(profileSkillController.deleteProfileSkill);

export default router;