import { expect } from "chai";
import sinon from "sinon";

import ResourceRequestController from "../../src/controllers/ResourceRequest.controller.js";
import ResourceRequestService from "../../src/services/ResourceRequest.service.js";

describe("ResourceRequest Controller", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
        };
        res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
    });

    describe("getAllResourceRequests", () => {
        it("should return 200 with a list of resource requests", async () => {
            const resourceRequests = [
                { id: "1", type: "Water", quantity: 100 },
                { id: "2", type: "Food", quantity: 200 },
            ];
            const getAllResourceRequestsStub = sinon.stub(ResourceRequestService, "getAllResourceRequests").resolves(resourceRequests);

            await ResourceRequestController.getAllResourceRequests(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(resourceRequests)).to.be.true;
            getAllResourceRequestsStub.restore();
        });

        it("should return 500 if there is an error", async () => {
            const getAllResourceRequestsStub = sinon.stub(ResourceRequestService, "getAllResourceRequests").rejects(new Error("Error"));

            await ResourceRequestController.getAllResourceRequests(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            getAllResourceRequestsStub.restore();
        });
    });

    describe("createNewResourceRequest", () => {
        beforeEach(() => {
            req.body = { type: "Medical Supplies", quantity: 50 };
        });

        it("should return 201 after creating a new resource request", async () => {
            const newResourceRequest = { id: "3", ...req.body };
            const createNewResourceRequestStub = sinon.stub(ResourceRequestService, "createNewResourceRequest").resolves(newResourceRequest);

            await ResourceRequestController.createNewResourceRequest(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(newResourceRequest)).to.be.true;
            createNewResourceRequestStub.restore();
        });

        it("should return 400 if request body is invalid", async () => {
            req.body = null;

            await ResourceRequestController.createNewResourceRequest(req, res);

            expect(res.status.calledWith(400)).to.be.true;
        });

        it("should return 500 if there is an error", async () => {
            const createNewResourceRequestStub = sinon.stub(ResourceRequestService, "createNewResourceRequest").rejects(new Error("Error"));

            await ResourceRequestController.createNewResourceRequest(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            createNewResourceRequestStub.restore();
        });
    });

    describe("updateResourceRequest", () => {
        beforeEach(() => {
            req.body = { id: "1", type: "Water", quantity: 150 };
        });

        it("should return 200 after updating a resource request", async () => {
            const updatedResourceRequest = { ...req.body };
            const updateResourceRequestStub = sinon.stub(ResourceRequestService, "updateResourceRequest").resolves(updatedResourceRequest);

            await ResourceRequestController.updateResourceRequest(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(updatedResourceRequest)).to.be.true;
            updateResourceRequestStub.restore();
        });

        it("should return 400 if request body is invalid or missing id", async () => {
            req.body = null;

            await ResourceRequestController.updateResourceRequest(req, res);

            expect(res.status.calledWith(400)).to.be.true;

            req.body = { type: "Food" }; // Missing id

            await ResourceRequestController.updateResourceRequest(req, res);

            expect(res.status.calledWith(400)).to.be.true;
        });

        it("should return 404 if resource request not found", async () => {
            const updateResourceRequestStub = sinon.stub(ResourceRequestService, "updateResourceRequest").resolves(null);

            await ResourceRequestController.updateResourceRequest(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            updateResourceRequestStub.restore();
        });

        it("should return 500 if there is an error", async () => {
            const updateResourceRequestStub = sinon.stub(ResourceRequestService, "updateResourceRequest").rejects(new Error("Error"));

            await ResourceRequestController.updateResourceRequest(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            updateResourceRequestStub.restore();
        });
    });

    describe("deleteResourceRequest", () => {
        beforeEach(() => {
            req.body = { id: "1" };
        });

        it("should return 200 after successfully deleting a resource request", async () => {
            const deleteResourceRequestStub = sinon.stub(ResourceRequestService, "deleteResourceRequest").resolves(true);

            await ResourceRequestController.deleteResourceRequest(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ message: "Resource request successfully deleted" })).to.be.true;
            deleteResourceRequestStub.restore();
        });

        it("should return 400 if request body is invalid or missing id", async () => {
            req.body = null;

            await ResourceRequestController.deleteResourceRequest(req, res);

            expect(res.status.calledWith(400)).to.be.true;

            req.body = {}; // Missing id

            await ResourceRequestController.deleteResourceRequest(req, res);

            expect(res.status.calledWith(400)).to.be.true;
        });

        it("should return 404 if resource request not found", async () => {
            const deleteResourceRequestStub = sinon.stub(ResourceRequestService, "deleteResourceRequest").resolves(false);

            await ResourceRequestController.deleteResourceRequest(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            deleteResourceRequestStub.restore();
        });

        it("should return 500 if there is an error", async () => {
            const deleteResourceRequestStub = sinon.stub(ResourceRequestService, "deleteResourceRequest").rejects(new Error("Error"));

            await ResourceRequestController.deleteResourceRequest(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            deleteResourceRequestStub.restore();
        });
    });
});