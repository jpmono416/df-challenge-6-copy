import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth/AuthProvider";
import ProfileCard from "../../src/components/profile/ProfileCard";
import UserService from "../../src/service/User.service";
import jest from "jest-mock";

vi.mock("../../src/service/User.service");

const mockUserDetails = {
    _id: "user123",
    name: "John Doe",
    email: "john.doe@example.com",
    roles: ["User", "Admin"],
    trackedDisasters: [{ id: "1", name: "Hurricane Example", location: "Example Location" }],
};

describe("ProfileCard", () => {
    it("renders user details correctly", async () => {
        UserService.getUserById.mockResolvedValue(mockUserDetails);

        const updateUserDetails = jest.fn();

        render(
            <AuthContext.Provider value={{ userDetails: mockUserDetails, updateUserDetails }}>
                <ProfileCard />
            </AuthContext.Provider>
        );

        expect(screen.getByText("Profile")).toBeInTheDocument();
        expect(screen.getByText(mockUserDetails.name)).toBeInTheDocument();
        expect(screen.getByText(`Email: ${mockUserDetails.email}`)).toBeInTheDocument();
        expect(screen.getByText(`Roles: ${mockUserDetails.roles.join(", ")}`)).toBeInTheDocument();
    });

    it("calls updateUserDetails with fetched user details", async () => {
        UserService.getUserById.mockResolvedValue(mockUserDetails);
        const updateUserDetails = jest.fn();

        render(
            <AuthContext.Provider value={{ userDetails: {}, updateUserDetails }}>
                <ProfileCard />
            </AuthContext.Provider>
        );

        expect(UserService.getUserById).toHaveBeenCalledWith(undefined); // Initial call with no _id
        await screen.findByText(mockUserDetails.name); // Wait for user details to be displayed
        expect(updateUserDetails).toHaveBeenCalledWith(mockUserDetails);
    });

    it("displays tracked disasters if available", async () => {
        UserService.getUserById.mockResolvedValue(mockUserDetails);

        const updateUserDetails = jest.fn();

        render(
            <AuthContext.Provider value={{ userDetails: mockUserDetails, updateUserDetails }}>
                <ProfileCard />
            </AuthContext.Provider>
        );

        for (const disaster of mockUserDetails.trackedDisasters) {
            expect(await screen.findByText(disaster.name)).toBeInTheDocument();
        }
    });
});
