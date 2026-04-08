import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import passport from "passport";
// import jwt from "jsonwebtoken";
// import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, bio, github_url, skills, location } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });
    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName, lastName, username, email, password_hash, bio, github_url, skills, location
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password_hash");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/developers", async (req, res) => {
  try {
    const developers = await User.find().select("-password_hash").sort({ createdAt: -1 });
    res.json(developers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/developers/:id", async (req, res) => {
  try {
    const developer = await User.findById(req.params.id).select("-password_hash");
    if (!developer) return res.status(404).json({ message: "Developer not found" });
    res.json(developer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GITHUB OAuth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token}&id=${req.user._id}&username=${req.user.username}`);
  }
);

// GOOGLE OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token}&id=${req.user._id}&username=${req.user.username}`);
  }
);

export default router;