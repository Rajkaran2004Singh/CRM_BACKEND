import mongoose from "mongoose";

const audienceSchema = new mongoose.Schema(
  {
    rules: {
      type: Object,
      required: true,
    },
    audienceCount: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  audience: audienceSchema,
  message: {
    type: String,
    required: true,
  },
  scheduledDate: {
    type: Date,
    default: Date.now,
  },
  messagesSent: {
    type: Number,
    default: 0,
  },
  messagesFailed: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Campaign = mongoose.model("Campaign", campaignSchema);
