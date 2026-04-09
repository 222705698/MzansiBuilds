import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  developer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tech_stack: {
    type: [String]
  },
  stage: {
    type: String,
    enum: ["ideation", "planning", "building", "testing", "launched", "completed"],
    default: "ideation"
  },
  support_needed: {
    type: String
  },
  is_completed: {
    type: Boolean,
    default: false
  },
  completed_at: {
    type: Date
  }
}, {
  timestamps: true
});

const Project = mongoose.model("Project", projectSchema);

export default Project;