import { Schema, model } from "mongoose";
import ResourceReqStatuses from "../enums/ResourceRequestStatuses.js";
import ResourceTypes from "../enums/ResourceTypes.js";
import UrgencyLevels from "../enums/UrgencyLevels.js";

const resourceRequestSchema = new Schema({
    disasterId: {
        type: Schema.Types.ObjectId,
        ref: "Disaster",
    },
    requestedResourceType: {
        type: String,
        required: true,
        enum: Object.values(ResourceTypes),
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
        enum: Object.values(UrgencyLevels),
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(ResourceReqStatuses),
        default: ResourceReqStatuses.STILL_NEEDED,
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
