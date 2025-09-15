import { Campaign } from "../models/campaignSchema.js";
import { CommunicationLog } from "../models/communicationSchema.js";

export const sendCampaign = async (req, res) => {
  try {
    const { campaignId } = req.body;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    const logs = await Promise.all(
      campaign.audience.map(async customer => {
        const success = Math.random() < 0.9;

        const log = await CommunicationLog.create({
          campaignId: campaign._id,
          customerId: customer.customerId,
          message: campaign.message.replace("{{name}}", customer.name),
          status: success ? "SENT" : "FAILED",
          sentAt: Date.now(),
          updatedAt: Date.now(),
        });

        return log;
      })
    );

    res.status(200).json({
      message: "Campaign messages sent (simulated)",
      total: logs.length,
      sent: logs.filter(l => l.status === "SENT").length,
      failed: logs.filter(l => l.status === "FAILED").length,
      logs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending campaign", error: err.message });
  }
};

export const deliveryReceipt = async (req, res) => {
  try {
    const { logId, status } = req.body;
    const log = await CommunicationLog.findById(logId);
    if (!log) return res.status(404).json({ message: "Log not found" });

    log.status = status;
    log.updatedAt = Date.now();
    await log.save();

    res.status(200).json({ message: "Delivery status updated", data: log });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating delivery status", error: err.message });
  }
};

export const getCommunicationLogs = async (req, res) => {
  try {
    const logs = await CommunicationLog.find().sort({ sentAt: -1 });
    res.status(200).json({ data: logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching communication logs", error: err.message });
  }
};
