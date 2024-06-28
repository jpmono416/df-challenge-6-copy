import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainSection from "./components/home/MainSection";
import AppFooter from "./components/shared/AppFooter";
import AppNavbar from "./components/shared/AppNavbar";
import LoginCard from "./components/login/LoginCard";
import { AuthContext } from "./auth/AuthProvider";

const App = () => {
    const { addLoginToContext } = useContext(AuthContext);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            const user = JSON.parse(storedUser);
            addLoginToContext(user, storedToken); // Set the user state and token
        }
    }, []);

    return (
        <BrowserRouter>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                {/* Flex container */}
                <AppNavbar />
                <div style={{ flex: 1 }}>
                    {/* Main content area */}
                    <Routes>
                        <Route path="/" element={<MainSection />} />
                        <Route path="/login" element={<LoginCard />} />
                    </Routes>
                </div>
                <AppFooter />
            </div>
        </BrowserRouter>
    );
};

export default App;
