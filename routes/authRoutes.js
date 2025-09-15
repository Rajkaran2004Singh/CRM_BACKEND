import express from "express";
import { googleLogin, googleCallback, handleGoogleCallback, logoutUser, getCurrentUser } from "../controllers/authControllers.js";
const router = express.Router();

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback, handleGoogleCallback);
router.get("/logout", logoutUser);
router.get("/me", getCurrentUser);

export default router;