import { Schema, model } from "mongoose";
import DisasterStatuses from "../enums/DisasterStatuses.js";

const disasterSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    estimationPeopleAffected: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(DisasterStatuses),
    },
    createdBy: {
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
    resourceRequests: [
        {
            type: Schema.Types.ObjectId,
            ref: "ResourceRequest",
        },
    ],
});

const Disaster = model("Disaster", disasterSchema);

export default Disaster;
