import { Customer } from "../models/customerSchema.js";
import { Campaign } from "../models/campaignSchema.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const totalCampaigns = await Campaign.countDocuments();

    const recentCampaigns = await Campaign.find().sort({ createdAt: -1 }).limit(5);
    const recentCustomers = await Customer.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      user: req.user,
      totalCustomers,
      totalCampaigns,
      recentCampaigns,
      recentCustomers,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
};