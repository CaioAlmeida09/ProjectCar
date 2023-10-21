import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Detail } from "./pages/detail";
import { Dashboard } from "./pages/dashboard";
import { New } from "./pages/dashboard/new";
import Layout from "./components/layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/car/:id",
        element: <Detail />,
      },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/new", element: <New /> },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export { router };
