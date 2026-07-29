import {
    Navigate,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import ProtectedLayout from "./pages/ProtectedLayout";
import WorkspacesPage from "./pages/WorkspacesPage";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyPage from "./pages/PropertyPage";
import "./App.css";

const qc = new QueryClient();

const AppContent = ({ isOffline }: { isOffline: boolean }) => {
    const basename = import.meta.env.PROD ? "/house-hunter-note" : undefined;

    const router = createBrowserRouter(
        [
            {
                path: "/",
                Component: () => <Navigate to="/workspaces" replace />,
            },
            {
                path: "/login",
                Component: () => <LoginPage />,
            },
            {
                Component: () => <ProtectedLayout isOffline={isOffline} />,
                children: [
                    {
                        path: "/workspaces",
                        Component: () => <WorkspacesPage />,
                    },
                    {
                        path: "/workspaces/:workspaceId",
                        Component: () => <PropertiesPage />,
                    },
                    {
                        path: "/workspaces/:workspaceId/property/:id",
                        Component: () => <PropertyPage />,
                    },
                ],
            },
            {
                path: "*",
                Component: () => <Navigate to="/workspaces" replace />,
            },
        ],
        {
            basename,
        },
    );

    return (
        <QueryClientProvider client={qc}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export default AppContent;
