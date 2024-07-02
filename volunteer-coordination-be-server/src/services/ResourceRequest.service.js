import ResourceRequest from "../models/ResourceRequest.model.js";

export default class ResourceRequestService {
    static getAllResourceRequests = async () => {
        try {
            return await ResourceRequest.find({}).exec();
        } catch (error) {
            throw new Error("Error fetching resource requests: " + error.message);
        }
    };

    static createNewResourceRequest = async (requestData) => {
        try {
            const request = new ResourceRequest(requestData);
            await request.save();
            return request;
        } catch (error) {
            throw new Error("Error creating new resource request: " + error.message);
        }
    };

    static addManyResourceRequests = async (requestsData) => {
        try {
            const newRequests = await ResourceRequest.insertMany(requestsData);
            return newRequests.map((request) => request._id);
        } catch (error) {
            throw new Error("Error creating new resource requests: " + error.message);
        }
    };

    static updateResourceRequest = async (requestData) => {
        try {
            const { id, ...updateData } = requestData;
            const updatedRequest = await ResourceRequest.findByIdAndUpdate(id, updateData, {
                new: true,
            });
            return updatedRequest;
        } catch (error) {
            throw new Error("Error updating resource request: " + error.message);
        }
    };

    static upsertResourceRequest = async (requestData) => {
        try {
            const { id, ...updateData } = requestData;
            const upsertedRequest = await ResourceRequest.findByIdAndUpdate(
                id,
                updateData,
                { new: true, upsert: true }
            );
            return upsertedRequest;
        } catch (error) {
            throw new Error("Error upserting resource request: " + error.message);
        }
    };

    static deleteResourceRequest = async (id) => {
        try {
            const result = await ResourceRequest.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw new Error("Error deleting resource request: " + error.message);
        }
    };
}
