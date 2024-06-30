import { expect } from "chai";
import sinon from "sinon";

import Disaster from "../../src/models/Disaster.model.js";
import DisasterService from "../../src/services/Disaster.service.js";
import testDisasters from "../samples/Disaster.test.samples.js";

describe("Disaster Service", () => {
    afterEach(() => {
        sinon.restore();
    });

    describe("getAllActiveDisasters", () => {
        it("should return all active disasters", async () => {
            // Mocking the chain: Disaster.find().populate().exec()
            const findStub = sinon.stub(Disaster, "find").returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().resolves(testDisasters.disasters),
                }),
            });

            const result = await DisasterService.getAllActiveDisasters();

            expect(result).to.equal(testDisasters.disasters);
            expect(findStub.calledWith({ status: "Active" })).to.be.true;
        });

        it("should throw an error if there is a problem fetching disasters", async () => {
            const error = new Error("Failed to fetch");
            // Mocking the chain: Disaster.find().populate().exec()
            sinon.stub(Disaster, "find").returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().rejects(error),
                }),
            });

            await expect(DisasterService.getAllActiveDisasters()).to.be.rejectedWith(error.message);
        });
    });

    describe("getActiveDisastersCount", () => {
        it("should return the count of active disasters", async () => {
            //? This is a countDocuments method based on a filter, so I trust mongo to work out the filter part and I test the return value
            const countStub = sinon
                .stub(Disaster, "countDocuments")
                .resolves(testDisasters.disasters.length);

            const result = await DisasterService.getActiveDisastersCount();

            expect(result).to.equal(testDisasters.disasters.length);
            expect(countStub.calledWith({ status: "Active" })).to.be.true;
        });

        it("should throw an error if there is a problem counting disasters", async () => {
            const error = new Error("Failed to count");
            sinon.stub(Disaster, "countDocuments").rejects(error);

            await expect(DisasterService.getActiveDisastersCount()).to.be.rejectedWith(
                error.message
            );
        });
    });

    describe("addNewDisaster", () => {
        it("should add a new disaster", async () => {
            const saveStub = sinon.stub(Disaster.prototype, "save").resolves(testDisasters.disasters[2]);

            const result = await DisasterService.addNewDisaster(testDisasters.disasters[2]);

            expect(result).to.exist;
            expect(saveStub.called).to.be.true;
        });

        it("should throw an error if there is a problem adding the disaster", async () => {
            const error = new Error("Failed to add");
            sinon.stub(Disaster.prototype, "save").rejects(error);

            await expect(DisasterService.addNewDisaster({})).to.be.rejectedWith(error.message);
        });
    });

    describe("updateDisasterDetails", () => {
        it("should update disaster details", async () => {
            const findByIdAndUpdateStub = sinon
                .stub(Disaster, "findByIdAndUpdate")
                .resolves(testDisasters.disasters[1]);

            const result = await DisasterService.updateDisasterDetails(testDisasters.disasters[1]);

            expect(result).to.equal(testDisasters.disasters[1]);
            expect(findByIdAndUpdateStub.called).to.be.true;
        });

        it("should throw an error if there is a problem updating the disaster", async () => {
            const error = new Error("Failed to update");
            sinon.stub(Disaster, "findByIdAndUpdate").rejects(error);

            await expect(DisasterService.updateDisasterDetails({})).to.be.rejectedWith(
                error.message
            );
        });
    });

    describe("deleteDisaster", () => {
        it("should delete a disaster", async () => {
            const id = "123";
            const findByIdAndDeleteStub = sinon.stub(Disaster, "findByIdAndDelete").resolves(true);

            const result = await DisasterService.deleteDisaster(id);

            expect(result).to.be.true;
            expect(findByIdAndDeleteStub.calledWith(id)).to.be.true;
        });

        it("should throw an error if there is a problem deleting the disaster", async () => {
            const error = new Error("Failed to delete");
            sinon.stub(Disaster, "findByIdAndDelete").rejects(error);

            await expect(DisasterService.deleteDisaster("123")).to.be.rejectedWith(error.message);
        });
    });
});
