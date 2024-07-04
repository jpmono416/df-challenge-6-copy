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
            const { _id, ...updateData } = requestData;
            const updatedRequest = await ResourceRequest.findByIdAndUpdate(_id, updateData, {
                new: true,
            });
            return updatedRequest;
        } catch (error) {
            throw new Error("Error updating resource request: " + error.message);
        }
    };

    /*
    //! This method is meant to create new resources when they don't exist but it doesn't produce an _id for them so not in use
    static upsertResourceRequest = async (requestData) => {
        try {
            const { _id, ...updateData } = requestData;
            const upsertedRequest = await ResourceRequest.findByIdAndUpdate(
                _id,
                updateData,
                { new: true, upsert: true }
            );
            console.log("Upserted:", upsertedRequest);
            return upsertedRequest;
        } catch (error) {
            throw new Error("Error upserting resource request: " + error.message);
        }
    };
    */

    static deleteResourceRequest = async (id) => {
        try {
            const result = await ResourceRequest.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw new Error("Error deleting resource request: " + error.message);
        }
    };
}
