import { expect } from "chai";
import sinon from "sinon";
import supertest from "supertest";

import Config from "../../src/config/Config.js";
import Database from "../../src/db/Database.js";
import Server from "../../src/server/Server.js";
// Import other necessary models and services

import testDisasters from "../samples/Disaster.test.samples.js"; // Ensure you have test data for the models

//? This is an example. This test is not really working.
describe.skip("Integration Tests for Project Endpoints", function () {
    let server;
    let database;
    let request;

    before(async () => {
        // Load configuration
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;

        // Setup database and server
        database = new Database(DB_URI);
        await database.connect();

        server = new Server(PORT, HOST);
        server.start();

        // Setup supertest
        request = supertest(server.getApp());
    });

    after(async () => {
        // Teardown server and database
        await server.close();
        await database.close();
    });

    beforeEach(async () => {
        // Clear and setup database with test data
        // Similar to the provided reference
    });

    // Write specific endpoint tests
    // Example: Test for user creation endpoint
    describe("POST /user", () => {
        it("should create a new user and respond with a 201 status code", async () => {
            // Implementation of the test
        });

        // More tests...
    });

    describe("Disaster and User Integration Tests", () => {
        let createdDisasterId;
        let createdUserId;

        it("should create a new disaster", async () => {
            const disasterData = {
                /* Fill with valid disaster data */
            };
            const response = await request(app).post("/disasters").send(disasterData);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty("_id");
            createdDisasterId = response.body._id;
        });

        it("should create a new user", async () => {
            const userData = {
                /* Fill with valid user data */
            };
            const response = await request(app).post("/users").send(userData);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty("user");
            expect(response.body.user).toHaveProperty("_id");
            createdUserId = response.body.user._id;
        });

        it("should track a natural disaster for a user", async () => {
            const trackData = {
                userId: createdUserId,
                disasterId: createdDisasterId,
            };
            const response = await request(app).post("/users/track").send(trackData);

            expect(response.statusCode).toBe(200);
            // Additional assertions to verify tracking logic
        });

        it("should untrack a natural disaster for a user", async () => {
            const untrackData = {
                userId: createdUserId,
                disasterId: createdDisasterId,
            };
            const response = await request(app).post("/users/untrack").send(untrackData);

            expect(response.statusCode).toBe(200);
            // Additional assertions to verify untracking logic
        });

        // Add any cleanup logic if necessary
    });

    // More endpoint tests...
});
