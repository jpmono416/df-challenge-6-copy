import Disaster from "../models/Disaster.model.js";
import DisasterStatuses from "../enums/DisasterStatuses.js";

export default class DisasterService {
    static getAllActiveDisasters = async () => {
        try {
            return await Disaster.find({ status: DisasterStatuses.ACTIVE })
                .populate("resourceRequests")
                .exec();
        } catch (error) {
            throw new Error("Error fetching active disasters: " + error.message);
        }
    };

    static getActiveDisastersCount = async () => {
        try {
            return await Disaster.countDocuments({ status: DisasterStatuses.ACTIVE });
        } catch (error) {
            throw new Error("Error counting active disasters: " + error.message);
        }
    };

    static getDisasterById = async (id) => {
        try {
            return await Disaster.findById(id).populate("resourceRequests").exec();
        } catch (error) {
            throw new Error("Error fetching disaster by ID: " + error.message);
        }
    };

    static addNewDisaster = async (disasterData) => {
        try {
            const disaster = new Disaster(disasterData);
            await disaster.save();
            return disaster;
        } catch (error) {
            throw new Error("Error creating new disaster: " + error.message);
        }
    };

    static updateDisasterDetails = async (disasterData) => {
        try {
            const { id, ...updateData } = disasterData;
            const updatedDisaster = await Disaster.findByIdAndUpdate(id, updateData, { new: true })
                .populate("resourceRequests")
                .exec();
            return updatedDisaster;
        } catch (error) {
            throw new Error("Error updating disaster: " + error.message);
        }
    };

    static deleteDisaster = async (id) => {
        try {
            const result = await Disaster.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw new Error("Error deleting disaster: " + error.message);
        }
    };
}
