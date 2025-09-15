import passport from "passport";
import dotenv from "dotenv"

dotenv.config({ path: "./config/.env" });

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/",
});

export const handleGoogleCallback = (req, res) => {
  const clientURL = process.env.FRONTEND_URL || "http://localhost:5173";
  res.redirect(`${clientURL}/dashboard`);
};

export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Logout failed");
    res.send("Logged out successfully");
  });
};

export const getCurrentUser = (req, res) => {
  res.json(req.user || null);
};
