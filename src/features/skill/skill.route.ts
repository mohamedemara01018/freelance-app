import { Router } from "express";
import * as skillController from "./skill.controller.js";

const router = Router();

// ==========================================
// Skill Routes
// ==========================================

// GET  /api/v1/skills - Get all skills (Optional: ?search=react & ?categoryId=...)
// POST /api/v1/skills - Create a new skill
router
    .route("/")
    .get(skillController.getAllSkills)
    .post(skillController.createSkill);

// GET    /api/v1/skills/:id - Get single skill by ID or Slug
// PATCH  /api/v1/skills/:id - Edit skill by ID
// DELETE /api/v1/skills/:id - Delete skill by ID
router
    .route("/:id")
    .get(skillController.getSkillById)
    .patch(skillController.editSkill)
    .delete(skillController.deleteSkill);

export default router;