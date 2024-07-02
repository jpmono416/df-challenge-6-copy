import axios from "axios";
import Config from "../config/Config.js";

export default class DisasterService {
    static getAllActiveDisasters = async () => {
        try {
            const response = await axios.get(`${Config.backendUrl()}/disasters`);
            return response.data;
        } catch (error) {
            return {
                failed: true,
                message: "An unexpected error occurred while fetching disasters. Please try again.",
            };
        }
    };

    static getDisasterById = async (disasterId) => {
        try {
            const response = await axios.get(`${Config.backendUrl()}/disasters/${disasterId}`);
            return response.data;
        } catch (error) {
            return {
                failed: true,
                message:
                    "An unexpected error occurred while fetching the disaster. Please try again.",
            };
        }
    };

    static getActiveDisastersCount = async () => {
        try {
            const response = await axios.get(`${Config.backendUrl()}/disasters/count`);
            return response.data.count;
        } catch (error) {
            return {
                failed: true,
                message:
                    "An unexpected error occurred while fetching disaster count. Please try again.",
            };
        }
    };

    static addNewDisaster = async (disasterData, token) => {
        try {
            //? Add createdBy to each resource request before sending to the backend for simpler data processing
            disasterData.resourceRequests = disasterData.resourceRequests.map((request) => ({
                ...request,
                requestedBy: disasterData.createdBy,
            }));

            const response = await axios.post(`${Config.backendUrl()}/disasters`, disasterData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        } catch (error) {
            return {
                failed: true,
                message:
                    "An unexpected error occurred while adding a new disaster. Please try again.",
            };
        }
    };

    static updateDisasterDetails = async (disasterData, token) => {
        try {
            console.log("Disaster data: ", disasterData);
            
            // Add createdBy
            disasterData.resourceRequests = disasterData.resourceRequests.map((request) => ({
                ...request,
                requestedBy: disasterData.createdBy,
                disasterId: disasterData.id,
            }));

            const response = await axios.put(`${Config.backendUrl()}/disasters`, disasterData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return {
                failed: true,
                message:
                    "An unexpected error occurred while updating disaster details. Please try again.",
            };
        }
    };

    static deleteDisaster = async (disasterId, token) => {
        try {
            const response = await axios.delete(`${Config.backendUrl()}/disasters`, {
                data: { id: disasterId },
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return {
                failed: true,
                message:
                    "An unexpected error occurred while deleting the disaster. Please try again.",
            };
        }
    };
}
