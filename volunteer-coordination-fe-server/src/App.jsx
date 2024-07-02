import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainSection from "./components/home/MainSection";
import AppFooter from "./components/shared/AppFooter";
import AppNavbar from "./components/shared/AppNavbar";
import LoginCard from "./components/login/LoginCard";
import DisasterDetails from "./components/disasters/DisasterDetails";
import DisasterList from "./components/disasters/DisasterList";
import InternalError from "./components/shared/InternalError";
import CreateDisasterCard from "./components/disasters/CreateDisasterCard";
import ProfileCard from "./components/profile/ProfileCard";

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
                <AppNavbar />
                <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
                    <Routes>
                        <Route path="/" element={<MainSection />} />
                        <Route path="/login" element={<LoginCard />} />
                        <Route path="/profile" element={<ProfileCard />} />
                        <Route path="/disasters" element={<DisasterList />} />
                        <Route path="/disasters/:id" element={<DisasterDetails />} />
                        <Route path="/disasters/create" element={<CreateDisasterCard />} />
                        <Route path="/error" element={<InternalError />} />
                    </Routes>
                </div>
                <AppFooter />
            </div>
        </BrowserRouter>
    );
};

export default App;
