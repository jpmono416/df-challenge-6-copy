import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import jwt from "jsonwebtoken";

import User from "../../src/models/User.model.js";
import UserService from "../../src/services/User.service.js";

import testUsers from "../samples/User.test.samples.js";

use(chaiAsPromised);

describe("User Service", () => {
    describe("Account details", () => {
        it("should create a user", async () => {
            const saveStub = sinon.stub(User.prototype, "save").resolves(testUsers.users[0]);
            const jwtStub = sinon.stub(jwt, "sign").resolves("token");

            const { user, token } = await UserService.createUser(testUsers.users[0]);

            expect(user).to.exist;
            expect(token).to.exist;
            saveStub.restore();
            jwtStub.restore();
        });

        describe("Login user", () => {
            it("should login a user", async () => {
                const userMock = testUsers.users[1];
                const findOneStub = sinon.stub(User, "findOne").returns({
                    populate: sinon.stub().returns({
                        exec: sinon.stub().resolves(userMock),
                    }),
                });
                const jwtStub = sinon.stub(jwt, "sign").returns("token");

                const { user, token } = await UserService.loginUser(
                    userMock.email,
                    userMock.password
                );
                expect(user).to.exist;
                expect(token).to.exist;

                findOneStub.restore();
                jwtStub.restore();
            });

            // TODO is this what is actually being returned by the service?
            it("should return nothing if no user is found", async () => {
                const findOneStub = sinon.stub(User, "findOne").returns({
                    populate: sinon.stub().returns({
                        exec: sinon.stub().resolves(null),
                    }),
                });
                const result = await UserService.loginUser("test", "test");
                expect(result).to.be.undefined;
                findOneStub.restore();
            });
        });

        describe("Change password", () => {
            it("should change password", async () => {
                const userMock = {
                    ...testUsers[0],
                    save: sinon.stub().resolves(testUsers[0]),
                };
                const newUser = userMock;
                newUser.password = "newPassword";

                const findOneStub = sinon.stub(User, "findOne").returns({
                    populate: sinon.stub().returns({
                        exec: sinon.stub().resolves(userMock),
                    }),
                });
                const saveStub = sinon.stub(User.prototype, "save").returns(testUsers[0]);

                const result = await UserService.changePassword(
                    userMock.email,
                    userMock.password,
                    newUser.password
                );
                expect(result).to.equal(newUser);
                findOneStub.restore();
                saveStub.restore();
            });

            it("should return nothing if no user is found", async () => {
                const findOneStub = sinon.stub(User, "findOne").returns({
                    populate: sinon.stub().returns({
                        exec: sinon.stub().resolves(null),
                    }),
                });
                const result = await UserService.changePassword("test", "test", "newPassword");
                expect(result).to.be.undefined;
                findOneStub.restore();
            });
        });
    });

    describe("getUserByEmail", () => {
        it("should get a user by email", async () => {
            const findOneStub = sinon.stub(User, "findOne").returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().resolves(testUsers.users[1]),
                }),
            });
            const result = await UserService.getUserByEmail(testUsers.users[1].email);

            expect(result).to.equal(testUsers.users[1]);
            findOneStub.restore();
        });

        // TODO for the end: Can this be improved?
        it("should return nothing if no user is found", async () => {
            const findOneStub = sinon.stub(User, "findOne").returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().resolves(null),
                }),
            });
            const result = await UserService.getUserByEmail("test");

            expect(result).to.be.null;
            findOneStub.restore();
        });

        it("should throw an error if an error occurs", async () => {
            const findOneStub = sinon.stub(User, "findOne").returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().rejects(new Error("Failed to find user")),
                }),
            });

            await expect(UserService.getUserByEmail("test")).to.be.rejectedWith(
                "Invalid user: Failed to find user"
            );

            findOneStub.restore();
        });

        it("should use the correct query", async () => {
            const findOneStub = sinon.stub(User, "findOne").returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().resolves(testUsers.users[1]),
                }),
            });
            await UserService.getUserByEmail(testUsers.users[1].email);

            expect(findOneStub.calledWith({ email: testUsers.users[1].email })).to.be.true;
            findOneStub.restore();
        });
    });

    describe("addRole", () => {
        let userMock;

        beforeEach(() => {
            userMock = { ...testUsers.users[0], roles: [], save: sinon.stub().resolves() };
        });

        afterEach(() => {
            sinon.restore();
        });

        it("should add a role to the user", async () => {
            const findOneStub = sinon.stub(User, "findOne").returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().resolves(userMock),
                }),
            });
            const roleToAdd = "admin";

            await UserService.addRole(userMock.email, roleToAdd);

            expect(userMock.roles.includes(roleToAdd)).to.be.true;
            expect(userMock.save.called).to.be.true;
            findOneStub.restore();
        });

        it("should return the user with the new role", async () => {
            const findOneStub = sinon.stub(User, "findOne").returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().resolves(userMock),
                }),
            });
            const roleToAdd = "editor";

            const updatedUser = await UserService.addRole(userMock.email, roleToAdd);

            expect(updatedUser).to.exist;
            expect(updatedUser.roles.includes(roleToAdd)).to.be.true;
            findOneStub.restore();
        });

        it("should return undefined if the user does not exist", async () => {
            const findOneStub = sinon.stub(User, "findOne").returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().resolves(null),
                }),
            });
            const result = await UserService.addRole("nonexistent@example.com", "admin");

            expect(result).to.be.undefined;
            findOneStub.restore();
        });

        it("should throw an error if saving the user fails", async () => {
            const findOneStub = sinon.stub(User, "findOne").returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().resolves(userMock),
                }),
            });
            userMock.save = sinon.stub().rejects(new Error("Failed to save"));

            await expect(UserService.addRole(userMock.email, "admin")).to.be.rejectedWith(
                "Adding role failed: Failed to save"
            );

            findOneStub.restore();
        });
    });
});
