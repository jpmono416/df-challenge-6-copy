import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Router, createMemoryRouter } from "react-router-dom";
import DisasterList from "../../src/components/disasters/DisasterList";
import DisasterService from "../../src/service/Disaster.service";
import testDisasters from "../samples/Disaster.test.samples";

vi.mock("../../src/service/Disaster.service");

// function renderWithRouter(ui, { route = "/" } = {}) {
//     const history = createMemoryHistory({ initialEntries: [route] });
//     const Wrapper = ({ children }) => <Router history={history}>{children}</Router>;
//     return {
//         ...render(ui, { wrapper: Wrapper }),
//         history,
//     };
// }

// describe("DisasterList", () => {
//     it.skip("displays loading message before disasters are fetched", async () => {
//         DisasterService.getAllActiveDisasters.mockResolvedValue([]);
//         renderWithRouter(<DisasterList />);
//         const loadingMessage = await screen.findByText("Loading...");
//         expect(loadingMessage).toBeInTheDocument();
//     });

//     it("displays disasters after successful fetch", async () => {
//         DisasterService.getAllActiveDisasters.mockResolvedValue(testDisasters.disasters);
//         renderWithRouter(<DisasterList />);
//         await screen.debug();
//         await screen.findByText(testDisasters.disasters[0].location);
//         expect(screen.getByText(testDisasters.disasters[1].location)).toBeInTheDocument();
//         expect(screen.getByText(testDisasters.disasters[2].location)).toBeInTheDocument();
//     });

//     it.skip("navigates to error page on fetch failure", async () => {
//         const failedFetch = { failed: true };
//         DisasterService.getAllActiveDisasters.mockResolvedValue(failedFetch);
//         renderWithRouter(<DisasterList />);
//         expect(window.location.pathname).toBe("/error");
//     });
// });

it("displays loading message on render", () => {
    render(
        <MemoryRouter>
            <DisasterList />
        </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

it("should call the service", async () => {
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

it("should call the service", async () => {
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