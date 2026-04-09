import express from "express";
import Comment from "../models/Comment.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/:projectId", protect, async (req, res) => {
  try {
    const comment = await Comment.create({
      project_id: req.params.projectId,
      author_id: req.user.id,
      body: req.body.body,
      type: req.body.type || "comment"
    });
    await comment.populate("author_id", "username avatar_url");
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:projectId", async (req, res) => {
  try {
    const comments = await Comment.find({ project_id: req.params.projectId })
      .populate("author_id", "username avatar_url")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;