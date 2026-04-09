import mongoose from "mongoose";

const celebrationWallSchema = new mongoose.Schema({
  developer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  celebrated_at: { type: Date, default: Date.now }
}, { timestamps: true });

const CelebrationWall = mongoose.model("CelebrationWall", celebrationWallSchema);
export default CelebrationWall;