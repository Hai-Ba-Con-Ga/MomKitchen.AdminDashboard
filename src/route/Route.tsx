import { RouteObject, createBrowserRouter } from "react-router-dom";
import LandingLayout from "../base/components/layout/LandingLayout";
import appRoutes from "@/base/app/route";

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
];

export const router = createBrowserRouter(routes);
