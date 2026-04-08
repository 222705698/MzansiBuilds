import dotenv from "dotenv";
dotenv.config();

console.log("GitHub ID:", process.env.GITHUB_CLIENT_ID);

import express from "express";
import cors from "cors";
import session from "express-session";
import connectDB from "./config/db.js";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import milestoneRoutes from "./routes/milestones.js";
import commentRoutes from "./routes/comments.js";
import wallRoutes from "./routes/wall.js";

connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/wall", wallRoutes);

app.get("/", (req, res) => res.send("MzansiBuilds API running ✅"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});