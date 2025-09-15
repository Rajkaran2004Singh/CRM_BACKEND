import { Customer } from "../models/customerSchema.js";
import { evaluateRules } from "../utils/ruleEvaluators.js";

export const evaluateSegment = async (req, res) => {
  try {
    const rules = req.body;

    const customers = await Customer.find();
    const matched = customers.filter(c => evaluateRules(c, rules));

    res.status(200).json({
      message: "Segment evaluated successfully",
      audienceSize: matched.length,
      data: matched
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error evaluating segment", error: err.message });
  }
};
