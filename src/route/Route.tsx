import { RouteObject, createBrowserRouter } from "react-router-dom";
import LandingLayout from "../base/layout/LandingLayout";
import appRoutes from "@/base/app/route";
import MainLayout from "../base/layout/MainLayout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      appRoutes,
      {
        path: "/contact",
        element: <h1>Click below to contact</h1>,
      },
    ],
  },
  {
    path: "/demo",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <h1>Click below to contact</h1>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
