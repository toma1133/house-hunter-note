import {
    Navigate,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import ProtectedLayout from "./pages/ProtectedLayout";
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
                Component: () => <Navigate to="/property" replace />,
            },
            {
                path: "/login",
                Component: () => <LoginPage />,
            },
            {
                Component: () => <ProtectedLayout isOffline={isOffline} />,
                children: [
                    {
                        path: "/property",
                        Component: () => <PropertiesPage />,
                    },
                    {
                        path: "/property/:id",
                        Component: () => <PropertyPage />,
                    },
                ],
            },
            {
                path: "*",
                Component: () => <div>頁面不存在</div>,
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
