import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { generateMessageSuggestions } from "../controllers/aiControllers.js";

const router = express.Router();

router.post("/messages", isAuthenticated, generateMessageSuggestions);

export default router;
