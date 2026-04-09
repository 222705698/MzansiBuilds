import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  title: { type: String, required: true },
  description: { type: String },
  achieved_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Milestone = mongoose.model("Milestone", milestoneSchema);
export default Milestone;