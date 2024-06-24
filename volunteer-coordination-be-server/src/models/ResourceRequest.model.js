import { Schema, model } from "mongoose";

const resourceRequestSchema = new Schema({
    disasterId: {
        type: Schema.Types.ObjectId,
        ref: "Disaster",
        required: true,
    },
    requestedResourceType: {
        type: String,
        required: true,
        enum: ["Water", "Medicine", "Food", "Shelter", "Clothing", "Hygiene", "Tools", "Volunteers", "Other"],
    },
    quantityNeeded: {
        type: Number,
        required: true,
    },
    quantityFulfilled: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    urgencyLevel: {
        type: String,
        required: true,
        enum: ["Low", "Medium", "High", "Immediate"],
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Still needed", "Goal reached", "Cancelled"],
    },
    requestedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
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

const ResourceRequest = model("ResourceRequest", resourceRequestSchema);

export default ResourceRequest;