import { Navigate } from "react-router-dom";
import { useUserStore } from "../states/userInfoState";
// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useUserStore();
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return children;
};
