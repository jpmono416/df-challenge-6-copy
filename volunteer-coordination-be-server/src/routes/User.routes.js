import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import UserValidator from "../middleware/User.validator.js";
import AuthValidator from "../middleware/Auth.validator.js";

export default class UserRoutes {
    #router;
    #routeStartPoint = "/user";

    constructor() {
        this.#router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes = () => {
        // User
        this.#router.get("/:email", UserController.getUserByEmail);
        this.#router.post("/register", UserValidator.validate, UserController.createUser);
        this.#router.post("/login", UserValidator.validate, UserController.loginUser);
        this.#router.put("/changePassword", UserValidator.validate, AuthValidator.verifyToken, UserController.changePassword);
        // this.#router.post("/track", UserValidator.validate, UserController.trackNaturalDisaster);


        // Roles
        this.#router.post("/role", AuthValidator.verifyToken, UserController.addRole);
        this.#router.delete("/role", AuthValidator.verifyToken, UserController.removeRole);
    };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}