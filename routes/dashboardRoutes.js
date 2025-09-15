import express from "express";
import { getDashboardSummary } from "../controllers/dashboardControllers.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/summary", isAuthenticated, getDashboardSummary);

export default router;
