import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileCard from "../../src/components/profile/ProfileCard";
import { AuthContext } from "../../src/auth/AuthProvider";
import UserService from "../../src/service/User.service";
import sinon from "sinon";

sinon.stub(UserService, "getUserById");

const mockAuthToken = "mockAuthToken";
const mockAddLoginToContext = sinon.stub();
const mockLogout = sinon.stub();

const mockUserDetails = {
    _id: "user123",
    name: "John Doe",
    email: "john.doe@example.com",
    roles: ["User", "Admin"],
    trackedDisasters: [
        { id: "1", name: "Hurricane", location: "Florida" },
        { id: "2", name: "Earthquake", location: "California" },
    ],
};

const mockUpdateUserDetails = sinon.fake();

const customRender = (ui, { providerProps, ...renderOptions }) => {
     window.history.pushState({}, "Test page", "/profile");
    return render(
        <AuthContext.Provider value={providerProps}>
            <BrowserRouter>
                <Routes>
                    <Route path="/profile">{ui}</Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>,
        renderOptions
    );
};

beforeEach(() => {
    UserService.getUserById.resetHistory(); // Reset history if using sinon
    UserService.getUserById.resolves(mockUserDetails); // Ensure it resolves the correct data
});

it("Renders", () => {
    
});



describe.skip("ProfileCard", () => {
    it("renders user details correctly", async () => {
        const providerProps = {
            userDetails: { name: "John Doe", email: "john@example.com", roles: ["User"] },
            updateUserDetails: sinon.mock(),
        };
        render(<ProfileCard />, { providerProps });

        expect(await screen.findByText("Profile")).toBeInTheDocument();
        expect(screen.getByText(`Name: ${mockUserDetails.name}`)).toBeInTheDocument();
        expect(screen.getByText(`Email: ${mockUserDetails.email}`)).toBeInTheDocument();
        expect(screen.getByText(`Roles: ${mockUserDetails.roles.join(", ")}`)).toBeInTheDocument();
    });

    it("renders tracked disasters if available", async () => {
        const providerProps = {
            userDetails: { name: "John Doe", email: "john@example.com", roles: ["User"] },
            updateUserDetails: sinon.mock(),
        };
        render(<ProfileCard />, { providerProps });

        for (const disaster of mockUserDetails.trackedDisasters) {
            expect(await screen.findByText(disaster.name)).toBeInTheDocument();
        }
    });

    it("updates user details on component mount", async () => {
        const providerProps = {
            userDetails: { name: "John Doe", email: "john@example.com", roles: ["User"] },
            updateUserDetails: sinon.mock(),
        };
        render(<ProfileCard />, { providerProps });

        expect(UserService.getUserById).toHaveBeenCalledWith(mockUserDetails._id);
        expect(mockUpdateUserDetails).toHaveBeenCalledWith(mockUserDetails);
    });
});
