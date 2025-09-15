import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createCampaign, getAllCampaigns, getCampaignById, updateCampaign, deleteCampaign, executeCampaign } from "../controllers/campaignControllers.js";
import { deliverCampaign } from "../controllers/campaignDeliveryController.js";
const router = express.Router();

router.post("/", isAuthenticated, createCampaign);
router.get("/", isAuthenticated, getAllCampaigns);
router.get("/:id", isAuthenticated, getCampaignById);
router.put("/:id", isAuthenticated, updateCampaign);
router.delete("/:id", isAuthenticated, deleteCampaign);
router.post("/:id/execute", isAuthenticated, executeCampaign);
router.post("/:campaignId/deliver",  deliverCampaign);
export default router;
