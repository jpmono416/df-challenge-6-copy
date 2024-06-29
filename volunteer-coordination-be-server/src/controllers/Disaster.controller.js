import DisasterService from "../services/Disaster.service.js";

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

    static addNewDisaster = async (req, res) => {
        try {
            if (!req.body) return res.status(400).json({ error: "Invalid disaster data" });
            const disaster = await DisasterService.addNewDisaster(req.body);
            res.status(201).json(disaster);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static updateDisasterDetails = async (req, res) => {
        try {
            if (!req.body || !req.body.id) return res.status(400).json({ error: "Invalid disaster data" });
            const updatedDisaster = await DisasterService.updateDisasterDetails(req.body);
            if (!updatedDisaster) return res.status(404).json({ error: "Disaster not found" });
            res.status(200).json(updatedDisaster);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static deleteDisaster = async (req, res) => {
        try {
            if (!req.body || !req.body.id) return res.status(400).json({ error: "Invalid disaster ID" });
            const result = await DisasterService.deleteDisaster(req.body.id);
            if (!result) return res.status(404).json({ error: "Disaster not found" });
            res.status(200).json({ message: "Disaster successfully deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}