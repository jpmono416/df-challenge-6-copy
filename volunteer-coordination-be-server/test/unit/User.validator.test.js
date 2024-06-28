import UserValidator from "../../src/middleware/User.validator.js";
import UserService from "../../src/services/User.service.js";
import { expect } from "chai";
import sinon from "sinon";
import httpMocks from "node-mocks-http";

describe("UserValidator", () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("validateUserRegistration", () => {
        // Example for successful validation
        it("should call next() for successful validation", async () => {
            req.body = { name: "John Doe", email: "test@example.com", password: "password123" };
            sinon.stub(UserService, "getUserByEmail").resolves(null);
            await UserValidator.validateUserRegistration(req, res, next);
            sinon.assert.calledOnce(next);
        });
        
        describe("Name validation", () => {
            it("should return 400 if name is not provided", async () => {
                req.body = { email: "test@example.com", password: "password123" };
                await UserValidator.validateUserRegistration(req, res, next);
                expect(res.statusCode).to.equal(400);
                expect(res._getJSONData()).to.have.property("message", "Name is required");
            });

            // Test with a non-string name
            it("should return 400 if name is not a string", async () => {
                req.body = { name: 12345, email: "test@example.com", password: "password123" };
                await UserValidator.validateUserRegistration(req, res, next);
                expect(res.statusCode).to.equal(400);
                expect(res._getJSONData()).to.have.property("message", "Name is required");
            });

            // Test with an empty string name
            it("should return 400 if name is an empty string", async () => {
                req.body = { name: "", email: "test@example.com", password: "password123" };
                await UserValidator.validateUserRegistration(req, res, next);
                expect(res.statusCode).to.equal(400);
                expect(res._getJSONData()).to.have.property("message", "Name is required");
            });
        });

        describe("Email validation", () => {
            // Example for email validation
            it("should return 400 if email is not provided", async () => {
                req.body = { name: "John Doe", password: "password123" };
                await UserValidator.validateUserRegistration(req, res, next);
                expect(res.statusCode).to.equal(400);
                expect(res._getJSONData()).to.have.property("message", "Email is required");
            });

            // Test with a non-string email
            it("should return 400 if email is not a string", async () => {
                req.body = { name: "John Doe", email: 12345, password: "password123" };
                await UserValidator.validateUserRegistration(req, res, next);
                expect(res.statusCode).to.equal(400);
                expect(res._getJSONData()).to.have.property("message", "Email is required");
            });

            // Test with an invalid email format
            it("should return 400 if email format is invalid", async () => {
                req.body = { name: "John Doe", email: "test", password: "password123" };
                await UserValidator.validateUserRegistration(req, res, next);
                expect(res.statusCode).to.equal(400);
                expect(res._getJSONData()).to.have.property("message", "Invalid email format");
            });

            // Test with a valid email that already exists in the database
            it("should return 400 if email already exists", async () => {
                req.body = {
                    name: "John Doe",
                    email: "existing@example.com",
                    password: "password123",
                };
                sinon.stub(UserService, "getUserByEmail").resolves(true); // Assuming email exists
                await UserValidator.validateUserRegistration(req, res, next);
                expect(res.statusCode).to.equal(400);
                expect(res._getJSONData()).to.have.property("message", "Email is already in use");
            });
        });

        describe("Password validation", () => {
            // Test with no password provided
            it("should return 400 if password is not provided", async () => {
                req.body = { name: "John Doe", email: "test@example.com" };
                await UserValidator.validateUserRegistration(req, res, next);
                expect(res.statusCode).to.equal(400);
                expect(res._getJSONData()).to.have.property("message", "Password is required");
            });

            // Test with a non-string password
            it("should return 400 if password is not a string", async () => {
                req.body = { name: "John Doe", email: "test@example.com", password: 12345 };
                await UserValidator.validateUserRegistration(req, res, next);
                expect(res.statusCode).to.equal(400);
                expect(res._getJSONData()).to.have.property("message", "Password is required");
            });

            // Test with a password shorter than 8 characters
            it("should return 400 if password is shorter than 8 characters", async () => {
                req.body = { name: "John Doe", email: "test@example.com", password: "short" };
                await UserValidator.validateUserRegistration(req, res, next);
                expect(res.statusCode).to.equal(400);
                expect(res._getJSONData()).to.have.property("message", "Invalid password");
            });

            // Test with an empty string password
            it("should return 400 if password is an empty string", async () => {
                req.body = { name: "John Doe", email: "test@example.com", password: "" };
                await UserValidator.validateUserRegistration(req, res, next);
                expect(res.statusCode).to.equal(400);
                expect(res._getJSONData()).to.have.property("message", "Password is required");
            });
        });

        // Test handling of database errors during email existence check
        it("should handle database errors during email check", async () => {
            req.body = { name: "John Doe", email: "test@example.com", password: "password123" };
            sinon.stub(UserService, "getUserByEmail").rejects(new Error("Database error"));
            await UserValidator.validateUserRegistration(req, res, next);
            expect(res.statusCode).to.equal(500);
            expect(res._getJSONData()).to.have.property("message", "Internal server error");
        });
    });
});
