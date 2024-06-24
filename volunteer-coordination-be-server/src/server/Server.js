import express from "express";
import UserRoutes from "../routes/User.routes.js";
import cors from "cors";

export default class Server {
    #app;
    #host;
    #port;
    #clientUrl;
    #server;
    #userRouter;

    constructor(port, host, clientUrl) {
        this.#app = express();
        this.#port = port;
        this.#host = host;
        this.#clientUrl = clientUrl;
        this.#server = null;
        this.#userRouter = new UserRoutes();
    }

    getApp = () => {
        return this.#app;
    };

    start = () => {
        // Cors options
        const corsOptions = {
            origin: this.#clientUrl,
        };

        // Start listening
        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server is listening on http://${this.#host}:${this.#port}`);
        });

        this.#app.use(express.json());
        this.#app.use(cors(corsOptions));

        // Routers
        this.#app.use(this.#userRouter.getRouteStartPoint(), this.#userRouter.getRouter());
    };

    close = () => {
        this.#server?.close();
    };
}
