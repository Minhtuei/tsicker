import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CreatePostPage } from "./pages/CreatePostPage";
import { useEffect } from "react";
import { useUserStore } from "./states/userInfoState";
import { authService } from "./services/authService";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { PostGridGallery } from "./components/home/PostGridGallery";
import { DetailPostPage } from "./pages/DetailPostPage";
export function App() {
    const { setUserInfo, setIsAuthenticated, authLoading, setAuthLoading } =
        useUserStore();
    useEffect(() => {
        const fetchDataAndDelay = async () => {
            const response = await authService.verify();
            if (response.success) {
                setUserInfo(response.user);
                setIsAuthenticated(true);
            }
            setAuthLoading(false);
        };
        fetchDataAndDelay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (authLoading) {
        return null;
    }
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/create"
                    element={
                        <ProtectedRoute>
                            <CreatePostPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/post"
                    element={
                        <ProtectedRoute>
                            <PostGridGallery />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/post/:postId"
                    element={
                        <ProtectedRoute>
                            <DetailPostPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}
