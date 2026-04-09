import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  body: { type: String, required: true },
  type: {
    type: String,
    enum: ["comment", "raise_hand"],
    default: "comment"
  }
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;