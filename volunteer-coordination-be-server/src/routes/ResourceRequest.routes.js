import { Router } from "express";
import ResourceRequestController from "../controllers/ResourceRequest.controller.js";
import AuthValidator from "../middleware/Auth.validator.js";

export default class ResourceRequestRoutes {
    #router;
    #routeStartPoint = "/resources";

    constructor() {
        this.#router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes = () => {
        // Get all resource requests
        this.#router.get("/", ResourceRequestController.getAllResourceRequests);
        // Create a new resource request
        this.#router.post("/", ResourceRequestController.createNewResourceRequest);
        // Update a resource request
        this.#router.put("/", AuthValidator.verifyToken, ResourceRequestController.updateResourceRequest);
        // Delete a resource
        this.#router.delete("/", AuthValidator.verifyToken, ResourceRequestController.deleteResourceRequest);
    };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}