import appRoutes from "@/base/app/route";
import CustomerList from "@/modules/customer/pages/list/list";
import {
  Navigate,
  Outlet,
  RouteObject,
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../base/layout/MainLayout";
import OrderListPage from "@/modules/order/pages/list/OrderListPage";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      appRoutes,
      {
        path: "/contact",
        element: <h1>Click below to contact</h1>,
      },
      { path: "/dashboard", element: <Navigate to="/" replace /> },
      {
        path: "/customer",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Navigate to="/customer/list" replace />,
          },
          {
            path: "list",
            element: <CustomerList />,
          },
          {
            path: "analytic",
            element: <h1>Customer analytic</h1>,
          },
        ],
      },
      {
        path: "/kitchen",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Navigate to="/kitchen/list" replace />,
          },
          {
            path: "list",
            element: <h1>kitchen List</h1>,
          },
          {
            path: "analytic",
            element: <h1>kitchen analytic</h1>,
          },
        ],
      },
      {
        path: "/order",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Navigate to="/order/list" replace />,
          },
          {
            path: "list",
            element: <OrderListPage />,
          },
          {
            path: "analytic",
            element: <h1>order analytic</h1>,
          },
        ],
      },
      {
        path: "/promotion",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Navigate to="/promotion/list" replace />,
          },
          {
            path: "list",
            element: <h1>promotion List</h1>,
          },
          {
            path: "analytic",
            element: <h1>promotion analytic</h1>,
          },
        ],
      },
    ],
  },
  {
    path: "/demo",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <h1>Click below to contact</h1>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
