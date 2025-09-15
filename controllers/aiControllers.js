import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: "./config/.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateMessageSuggestions = async (req, res) => {
  try {
    const { campaignObjective, audienceType } = req.body;

    const prompt = `Generate 3 short, friendly, and persuasive marketing messages for the following campaign objective: "${campaignObjective}" targeting: "${audienceType}". Format each message as a separate line.`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    const suggestions = rawText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    res.status(200).json({ suggestions });
  } catch (err) {
    console.error("Error generating messages:", err);
    res
      .status(500)
      .json({ message: "Error generating messages", error: err.message });
  }
};