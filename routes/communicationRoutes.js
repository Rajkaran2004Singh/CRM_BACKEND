import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { sendCampaign, deliveryReceipt, getCommunicationLogs } from "../controllers/communicationControllers.js";

const router = express.Router();
router.post("/send", isAuthenticated, sendCampaign);
router.post("/receipt", isAuthenticated, deliveryReceipt);
router.get("/logs", isAuthenticated, getCommunicationLogs);

export default router;
