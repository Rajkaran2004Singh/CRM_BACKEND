import { Campaign } from "../models/campaignSchema.js";
import { CommunicationLog } from "../models/communicationSchema.js";
import { sendViaVendor } from "../utils/vendorSimulator.js";
import { Customer } from "../models/customerSchema.js";
import { evaluateRules } from "../utils/ruleEvaluators.js";

export const deliverCampaign = async (req, res) => {
  try {
    const campaignId = req.params.campaignId;
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    const customers = await Customer.find();
    const matchedCustomers = customers.filter((c) =>
      evaluateRules(c, campaign.audience.rules)
    );

    let sent = 0;
    let failed = 0;
    const logs = [];
    const results = [];

    for (const customer of matchedCustomers) {
      const personalizedMessage = `Hi ${customer.name}, ${campaign.message}`;
      const result = await sendViaVendor(customer, personalizedMessage);

      if (result.status === "SENT") sent++;
      else failed++;

      const log = await CommunicationLog.create({
        campaignId: campaign._id,
        customerId: customer._id,
        status: result.status,
      });

      logs.push(log);

      results.push({
        customerName: customer.name,
        personalizedMessage,
        status: result.status,
      });
    }

    campaign.messagesSent += sent;
    campaign.messagesFailed += failed;
    campaign.updatedAt = Date.now();
    await campaign.save();

    res.status(200).json({
      message: "Campaign delivered successfully",
      campaignId: campaign._id,
      audienceSize: matchedCustomers.length,
      sent,
      failed,
      results,
    });
  } catch (err) {
    console.error("Error delivering campaign:", err);
    res.status(500).json({
      message: "Error delivering campaign",
      error: err.message,
    });
  }
};
