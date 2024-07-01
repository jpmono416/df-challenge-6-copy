import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

// Create a new context for authentication
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // State to track the user's authentication status
    const [authToken, setAuthToken] = useState("");
    const [userDetails, setUserDetails] = useState({});

    const addLoginToContext = (details, token) => {
        setUserDetails(details);
        setAuthToken(token);

        Cookies.set("token", token, { expires: 1 });

        localStorage.setItem("user", JSON.stringify(details));
        localStorage.setItem("token", token);
    };

    const updateUserDetails = (details) => {
        setUserDetails(details);
        localStorage.setItem("user", JSON.stringify(details));
    };

    const logout = () => {
        setAuthToken("");
        setUserDetails({});
    };

    // Provide the authentication state and login/logout functions to the child components
    return (
        <AuthContext.Provider
            value={{ authToken, userDetails, addLoginToContext, updateUserDetails, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
