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
        this.#router.post("/", UserValidator.validate, UserController.createUser);
        this.#router.post("/login", UserValidator.validate, UserController.loginUser);
        this.#router.put(
            "/changePassword",
            UserValidator.validate,
            AuthValidator.verifyToken,
            UserController.changePassword
        );

        // Roles
        this.#router.get("/roles", AuthValidator.verifyToken, UserController.getRoles);
        this.#router.post("/roles", AuthValidator.verifyToken, UserController.addRole);
    };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}