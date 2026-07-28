import { useState } from "react";
import {
    Navigate,
    Outlet,
    ScrollRestoration,
    useLocation,
    useNavigate,
} from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import LayoutContextType from "../models/types/LayoutContextTypes";
import LoadingMask from "../components/common/LoadingMask";
import { useTheme } from "../contexts/ThemeContext";

type ProtectedLayoutProps = {
    isOffline: boolean;
};

const ProtectedLayout = ({}: ProtectedLayoutProps) => {
    const { session, loading, signOut } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isPageLoading, setIsPageLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    if (loading) return <LoadingMask />;

    if (!session) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ returnTo: location.pathname }}
            />
        );
    }

    return (
        <div className={``}>
            {isPageLoading && <LoadingMask />}
            {/* Main Content */}
            <Outlet
                context={{ setIsPageLoading } satisfies LayoutContextType}
            />
            <ScrollRestoration />
        </div>
    );
};

export default ProtectedLayout;
