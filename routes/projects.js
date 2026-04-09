import express from "express";
import Project from "../models/Project.js";
import protect from "../middleware/auth.js";
import CelebrationWall from "../models/CelebrationWall.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { title, description, tech_stack, stage, support_needed } = req.body;
    const project = await Project.create({
      developer_id: req.user.id,
      title, description, tech_stack, stage, support_needed
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("developer_id", "username avatar_url")
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("developer_id", "username avatar_url");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id/complete", protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { is_completed: true, completed_at: new Date(), stage: "completed" },
      { new: true }
    );
    await CelebrationWall.create({
      developer_id: project.developer_id,
      project_id: project._id
    });
    res.json({ project, message: "🎉 Added to Celebration Wall!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;