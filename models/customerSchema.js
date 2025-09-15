import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, unique: true, required: true
    },
    phone: {
        type: String,
    },
    avatar: {
        type: String,
    },
    totalSpend: {
        type: Number,
        default: 0
    },
    lastPurchaseDate: {
        type: Date,
    },
    visits: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Customer = mongoose.model("Customer", customerSchema);
