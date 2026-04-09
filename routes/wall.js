import express from "express";
import CelebrationWall from "../models/CelebrationWall.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const wall = await CelebrationWall.find()
      .populate("developer_id", "username avatar_url bio")
      .populate("project_id", "title description tech_stack completed_at")
      .sort({ celebrated_at: -1 });
    res.json(wall);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;