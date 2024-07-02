import DisasterService from "../services/Disaster.service.js";
import ResourceRequestService from "../services/ResourceRequest.service.js";

export default class DisasterController {
    static getAllActiveDisasters = async (req, res) => {
        try {
            const disasters = await DisasterService.getAllActiveDisasters();
            res.status(200).json(disasters);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static getActiveDisastersCount = async (req, res) => {
        try {
            const count = await DisasterService.getActiveDisastersCount();
            res.status(200).json({ count });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static getDisasterById = async (req, res) => {
        try {
            if (!req.params.id) return res.status(400).json({ error: "Invalid disaster ID" });
            const disaster = await DisasterService.getDisasterById(req.params.id);
            if (!disaster) return res.status(404).json({ error: "Disaster not found" });
            res.status(200).json(disaster);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    //? Disasters may contain an array of resource requests, these are processed separately and linked at the end
    static addNewDisaster = async (req, res) => {
        try {
            if (!req.body) return res.status(400).json({ error: "Invalid disaster data" });

            // Destructure resourceRequests from the request body to be created before the disaster
            const { resourceRequests, ...disasterData } = req.body;
            const newResourceIds = await ResourceRequestService.addManyResourceRequests(
                resourceRequests
            );
            disasterData.resourceRequests = newResourceIds;
            const disaster = await DisasterService.addNewDisaster(disasterData);

            // Update the resource requests with the disaster ID
            await ResourceRequestService.updateResourceRequest({
                id: { $in: newResourceIds },
                disasterId: disaster._id,
            });

            res.status(201).json(disaster);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static updateDisasterDetails = async (req, res) => {
        try {
            if (!req.body || !req.body.id || !req.body.resourceRequests)
                return res.status(400).json({ error: "Invalid disaster data" });

            // Update the disaster details excluding resourceRequests
            const { resourceRequests, ...disasterData } = req.body;

            // Separate resourceRequests into updates and creations
            //? This was done with an upsert logic before but it wouldn't generate _ids for new elements.
            const updates = resourceRequests.filter((request) => request._id);
            const creations = resourceRequests.filter((request) => !request._id);

            console.log("Updates:", updates);
            console.log("Creations:", creations);

            // Process updates
            const updatePromises = updates.map((request) => {
                return ResourceRequestService.updateResourceRequest(request);
            });

            // Process creations
            const createPromises = creations.map((request) => {
                return ResourceRequestService.createNewResourceRequest(request);
            });

            // Wait for all operations to complete
            const updatedRequests = await Promise.all(updatePromises);
            const createdRequests = await Promise.all(createPromises);

            console.log("Promises:", updatedRequests, createdRequests);

            // Combine IDs from updated and created requests
            disasterData.resourceRequests = [...updatedRequests, ...createdRequests].map(
                (req) => req._id
            );
            console.log("Reqs:", disasterData.resourceRequests);

            const updatedDisaster = await DisasterService.updateDisasterDetails(disasterData);
            if (!updatedDisaster) return res.status(404).json({ error: "Disaster not found" });

            // Return the updated disaster with the resource requests (populated)
            const disasterWithResourceReqData = await DisasterService.getDisasterById(
                updatedDisaster._id
            );
            res.status(200).json(disasterWithResourceReqData);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    };

    static deleteDisaster = async (req, res) => {
        try {
            if (!req.body || !req.body.id)
                return res.status(400).json({ error: "Invalid disaster ID" });
            const result = await DisasterService.deleteDisaster(req.body.id);
            if (!result) return res.status(404).json({ error: "Disaster not found" });
            res.status(200).json({ message: "Disaster successfully deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
