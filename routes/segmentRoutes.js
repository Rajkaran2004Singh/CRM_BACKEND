import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { evaluateSegment } from "../controllers/segmentControllers.js";

const router = express.Router();

router.post("/evaluate", isAuthenticated, evaluateSegment);

export default router;
