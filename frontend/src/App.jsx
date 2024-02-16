import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { useUserStore } from "./states/userInfoState";
import { useEffect } from "react";
import { authService } from "./services/authService";
export function App() {
    const { setUserInfo, setAuthLoading, setIsAuthenticated } = useUserStore();
    useEffect(() => {
        authService.verify().then((response) => {
            if (response.success) {
                setUserInfo(response.user);
                setIsAuthenticated(true);
                setAuthLoading(false);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}
