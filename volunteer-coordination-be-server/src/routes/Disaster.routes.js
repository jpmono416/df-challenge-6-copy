import { Router } from "express";
import DisasterController from "../controllers/Disaster.controller.js";
import AuthValidator from "../middleware/Auth.validator.js";

export default class DisasterRoutes {
    #router;
    #routeStartPoint = "/disasters";

    constructor() {
        this.#router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes = () => {
        this.#router.get("/", AuthValidator.verifyToken, DisasterController.getAllActiveDisasters);
        this.#router.get("/count", DisasterController.getActiveDisastersCount);
        this.#router.post("/", AuthValidator.verifyToken, DisasterController.addNewDisaster);
        this.#router.put("/", AuthValidator.verifyToken, DisasterController.updateDisasterDetails);
        this.#router.delete("/", AuthValidator.verifyToken, DisasterController.deleteDisaster);
    };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}