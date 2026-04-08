import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails?.[0]?.value });

    if (!user) {
      user = await User.create({
        username: profile.username,
        email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
        password_hash: "oauth_github",
        firstName: profile.displayName?.split(" ")[0] || profile.username,
        lastName: profile.displayName?.split(" ")[1] || "",
        avatar_url: profile.photos?.[0]?.value,
        github_url: profile.profileUrl,
        bio: profile._json?.bio || ""
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails?.[0]?.value });

    if (!user) {
      user = await User.create({
        username: profile.emails?.[0]?.value.split("@")[0],
        email: profile.emails?.[0]?.value,
        password_hash: "oauth_google",
        firstName: profile.name?.givenName || "",
        lastName: profile.name?.familyName || "",
        avatar_url: profile.photos?.[0]?.value,
        bio: ""
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;