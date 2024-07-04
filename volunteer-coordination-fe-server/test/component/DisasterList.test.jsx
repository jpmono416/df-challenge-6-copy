import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Router, createMemoryRouter } from "react-router-dom";
import DisasterList from "../../src/components/disasters/DisasterList";
import DisasterService from "../../src/service/Disaster.service";
import testDisasters from "../samples/Disaster.test.samples";

vi.mock("../../src/service/Disaster.service");

it("displays loading message on render", () => {
    render(
        <MemoryRouter>
            <DisasterList />
        </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

it("should display disasters", async () => {
    DisasterService.getAllActiveDisasters.mockResolvedValue(testDisasters.disasters);
    render(
        <MemoryRouter>
            <DisasterList />
        </MemoryRouter>
    );

    for (const disaster of testDisasters.disasters) {
        expect(await screen.findByText(disaster.location)).toBeInTheDocument();
    }
});

// This can be adjusted in the code to display this element - not happening right now
it.skip("displays no active disasters when list is empty", async () => {
    DisasterService.getAllActiveDisasters.mockResolvedValue([]);
    render(
        <MemoryRouter>
            <DisasterList />
        </MemoryRouter>
    );

    expect(screen.getByText("No active disasters")).toBeInTheDocument();
});
