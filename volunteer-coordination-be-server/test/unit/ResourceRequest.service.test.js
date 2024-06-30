import { expect } from "chai";
import sinon from "sinon";

import ResourceRequest from "../../src/models/ResourceRequest.model.js";
import ResourceRequestService from "../../src/services/ResourceRequest.service.js";

describe("ResourceRequest Service", () => {
    afterEach(() => {
        sinon.restore();
    });

    describe("getAllResourceRequests", () => {
        it("should return all resource requests", async () => {
            const mockResourceRequests = [{ id: 1, name: "Request A" }, { id: 2, name: "Request B" }];
            sinon.stub(ResourceRequest, "find").returns({
                exec: sinon.stub().resolves(mockResourceRequests),
            });

            const result = await ResourceRequestService.getAllResourceRequests();

            expect(result).to.deep.equal(mockResourceRequests);
        });

        it("should throw an error if there is a problem fetching resource requests", async () => {
            const error = new Error("Failed to fetch");
            sinon.stub(ResourceRequest, "find").returns({
                exec: sinon.stub().rejects(error),
            });

            await expect(ResourceRequestService.getAllResourceRequests()).to.be.rejectedWith(error.message);
        });
    });

    describe("createNewResourceRequest", () => {
        it("should create a new resource request", async () => {
            const newRequestData = { name: "New Request" };
            const saveStub = sinon.stub(ResourceRequest.prototype, "save").resolves(newRequestData);

            const result = await ResourceRequestService.createNewResourceRequest(newRequestData);

            expect(result).to.exist;
            expect(saveStub.called).to.be.true;
        });

        it("should throw an error if there is a problem creating the resource request", async () => {
            const error = new Error("Failed to create");
            sinon.stub(ResourceRequest.prototype, "save").rejects(error);

            await expect(ResourceRequestService.createNewResourceRequest({})).to.be.rejectedWith(error.message);
        });
    });

    describe("updateResourceRequest", () => {
        it("should update resource request details", async () => {
            const requestData = { id: "123", name: "Updated Request" };
            const findByIdAndUpdateStub = sinon.stub(ResourceRequest, "findByIdAndUpdate").resolves(requestData);

            const result = await ResourceRequestService.updateResourceRequest(requestData);

            expect(result).to.deep.equal(requestData);
            expect(findByIdAndUpdateStub.calledWith(requestData.id, sinon.match.any, sinon.match.any)).to.be.true;
        });

        it("should throw an error if there is a problem updating the resource request", async () => {
            const error = new Error("Failed to update");
            sinon.stub(ResourceRequest, "findByIdAndUpdate").rejects(error);

            await expect(ResourceRequestService.updateResourceRequest({})).to.be.rejectedWith(error.message);
        });
    });

    describe("deleteResourceRequest", () => {
        it("should delete a resource request", async () => {
            const id = "123";
            const findByIdAndDeleteStub = sinon.stub(ResourceRequest, "findByIdAndDelete").resolves(true);

            const result = await ResourceRequestService.deleteResourceRequest(id);

            expect(result).to.be.true;
            expect(findByIdAndDeleteStub.calledWith(id)).to.be.true;
        });

        it("should throw an error if there is a problem deleting the resource request", async () => {
            const error = new Error("Failed to delete");
            sinon.stub(ResourceRequest, "findByIdAndDelete").rejects(error);

            await expect(ResourceRequestService.deleteResourceRequest("123")).to.be.rejectedWith(error.message);
        });
    });
});