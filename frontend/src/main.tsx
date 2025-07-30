import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css"
import HomePage from "./pages/home/home.tsx";
import LoginPage from "./pages/login/login.tsx";
import RegisterPage from "./pages/register/register.tsx";
import DashboardPage from "./pages/dashboard/dashboard.tsx";
import AdminRoot from "./pages/admin/AdminRoot.tsx";
import AdminDashboard from "./pages/admin/dashboard.tsx";
import AgentRoot from "./pages/agent/AgentRoot.tsx";
import AgentDashboard from "./pages/agent/dashboard.tsx";
import AudioEvaluationPage from "./pages/audio-evaluation/audio-evaluation.tsx";
import AIDashboardPage from "./pages/ai-dashboard/ai-dashboard.tsx";
import AgentStatisticsPage from "./pages/agent-statistics/agent-statistics.tsx";
import ManageUsersPage from "./pages/manage-users/manage-users.tsx";
import RubricsPage from "./pages/rubrics/rubrics.tsx";
import { Layout } from "./components/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register", 
    element: <RegisterPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/audio-evaluation",
        element: <AudioEvaluationPage />,
      },
      {
        path: "/ai-dashboard",
        element: <AIDashboardPage />,
      },
      {
        path: "/agent-statistics",
        element: <AgentStatisticsPage />,
      },
      {
        path: "/manage-users",
        element: <ManageUsersPage />,
      },
      {
        path: "/rubrics",
        element: <RubricsPage />,
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      }
    ]
  },
  {
    path: "/agent",
    element: <AgentRoot />,
    children: [
      {
        index: true,
        element: <AgentDashboard />,
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
