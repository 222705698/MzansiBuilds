import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  bio: { type: String },
  avatar_url: { type: String },
  github_url: { type: String },
  skills: { type: [String] },
  location: { type: String },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;