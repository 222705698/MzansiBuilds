import express from "express";
import Milestone from "../models/Milestone.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/:projectId", protect, async (req, res) => {
  try {
    const milestone = await Milestone.create({
      project_id: req.params.projectId,
      title: req.body.title,
      description: req.body.description
    });
    res.status(201).json(milestone);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:projectId", async (req, res) => {
  try {
    const milestones = await Milestone.find({ project_id: req.params.projectId })
      .sort({ achieved_at: -1 });
    res.json(milestones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;