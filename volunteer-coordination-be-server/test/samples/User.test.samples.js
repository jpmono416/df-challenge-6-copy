const testUsers = {
    users: [
        {
            name: "New User",
            email: "new.user@example.com",
            password: "new_hashed_password",
            roles: ["User"],
            disasterTracking: [],
            resourceRequests: [],
        },
        {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "hashed_password_here",
            roles: ["Admin", "Volunteer"],
            disasterTracking: ["62c0be7e8d22be001f5bcee2", "62c0be7f8d22be001f5bcee3"],
            resourceRequests: ["62c0be808d22be001f5bcee4"],
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            password: "hashed_password_here",
            roles: ["Coordinator"],
            disasterTracking: ["62c0be818d22be001f5bcee5"],
            resourceRequests: ["62c0be828d22be001f5bcee6", "62c0be838d22be001f5bcee7"],
        },
        {
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            password: "hashed_password_here",
            roles: ["Volunteer", "User"],
            disasterTracking: [],
            resourceRequests: ["62c0be848d22be001f5bcee8"],
        },
    ],
};
export default testUsers;
