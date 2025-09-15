import { Campaign } from "../models/campaignSchema.js";
import { Customer } from "../models/customerSchema.js";
import { CommunicationLog } from "../models/communicationSchema.js";
import { deliverCampaign } from "./campaignDeliveryController.js";
import { evaluateRules } from "../utils/ruleEvaluators.js";

export const createCampaign = async (req, res) => {
  try {
    const { name, description, rules, message, scheduledDate } = req.body;

    const customers = await Customer.find();
    const matched = customers.filter((c) => evaluateRules(c, rules));
    const audienceCount = matched.length;

    const campaign = await Campaign.create({
      name,
      description,
      createdBy: req.user._id,
      audience: { rules, audienceCount },
      message,
      scheduledDate: scheduledDate || Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await deliverCampaign(
      { params: { campaignId: campaign._id }, user: req.user },
      {
        status: () => ({ json: () => {} }),
      }
    );

    res.status(201).json({
      message: "Campaign created successfully",
      audienceCount,
      data: campaign,
    });
  } catch (err) {
    console.error("Error creating campaign:", err);
    res
      .status(500)
      .json({ message: "Error creating campaign", error: err.message });
  }
};


export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json({ data: campaigns });
  } catch (err) {
    res.status(500).json({ message: "Error fetching campaigns", error: err.message });
  }
};

export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.status(200).json({ data: campaign });
  } catch (err) {
    res.status(500).json({ message: "Error fetching campaign", error: err.message });
  }
};

export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    const { name, description, message, scheduledDate } = req.body;
    if (name) campaign.name = name;
    if (description) campaign.description = description;
    if (message) campaign.message = message;
    if (scheduledDate) campaign.scheduledDate = scheduledDate;
    campaign.updatedAt = Date.now();

    await campaign.save();
    res.status(200).json({ message: "Campaign updated", data: campaign });
  } catch (err) {
    res.status(500).json({ message: "Error updating campaign", error: err.message });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    await campaign.deleteOne();
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting campaign", error: err.message });
  }
};

export const executeCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    const audience = await Customer.find(campaign.audience.rules);
    let success = 0, failed = 0;

    for (const cust of audience) {
      try {
        console.log(`Sending to ${cust.email}: ${campaign.message}`);

        await CommunicationLog.create({
          campaignId: campaign._id,
          customerId: cust._id,
          status: "SENT",
        });
        success++;
      } catch (err) {
        await CommunicationLog.create({
          campaignId: campaign._id,
          customerId: cust._id,
          status: "FAILED",
        });
        failed++;
      }
    }

    campaign.messagesSent += success;
    campaign.messagesFailed += failed;
    await campaign.save();

    res.status(200).json({
      message: "Campaign executed",
      sent: success,
      failed,
    });
  } catch (err) {
    res.status(500).json({ message: "Error executing campaign", error: err.message });
  }
};
