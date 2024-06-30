import ResourceRequestService from "../services/ResourceRequest.service.js";

export default class ResourceRequestController {
    static getAllResourceRequests = async (req, res) => {
        try {
            const requests = await ResourceRequestService.getAllResourceRequests();
            res.status(200).json(requests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static createNewResourceRequest = async (req, res) => {
        try {
            if (!req.body) return res.status(400).json({ error: "Invalid resource request data" });
            const request = await ResourceRequestService.createNewResourceRequest(req.body);
            res.status(201).json(request);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static updateResourceRequest = async (req, res) => {
        try {
            if (!req.body || !req.body.id)
                return res.status(400).json({ error: "Invalid resource request data" });
            const updatedRequest = await ResourceRequestService.updateResourceRequest(req.body);
            if (!updatedRequest)
                return res.status(404).json({ error: "Resource request not found" });
            res.status(200).json(updatedRequest);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static deleteResourceRequest = async (req, res) => {
        try {
            if (!req.body || !req.body.id)
                return res.status(400).json({ error: "Invalid resource request ID" });
            const result = await ResourceRequestService.deleteResourceRequest(req.body.id);
            if (!result) return res.status(404).json({ error: "Resource request not found" });
            res.status(200).json({ message: "Resource request successfully deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
