import { Schema, model } from "mongoose";
import Roles from "../enums/Roles.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        enum: Object.values(Roles),
        default: [],
    },
    trackedDisasters: [
        {
            type: Schema.Types.ObjectId,
            ref: "Disaster",
        },
    ],
});

const User = model("User", userSchema);

export default User;
