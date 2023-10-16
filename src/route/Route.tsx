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
import LoginPage from "@/base/page/auth/LoginPage";
import KitchenListPage from "@/modules/kitchen/pages/KitchenListPage";
import AreaListPage from "@/modules/area/pages/AreaListPage";
import FeedbackListPage from "@/modules/feedback/pages/FeedbackListPage";
import PaymentListPage from "@/modules/payment/pages/PaymentListPage";
import DashboardPage from "@/modules/dashboard/pages";
import KitchenDetailPage from "@/modules/kitchen/pages/KitchenDetailPage";
import KitchenProfile from "@/modules/kitchen/pages/KitchenProfile";
import KitchenProfileMeal from "@/modules/kitchen/pages/KitchenProfileMeal";
import KitchenProfileTray from "@/modules/kitchen/pages/KitchenProfileTray";
import KitchenProfileDish from "@/modules/kitchen/pages/KitchenProfileDish";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      appRoutes,
      {
        path: "", element: <DashboardPage/>
      },
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
            element: <KitchenListPage/>,
          },
          {
            path: "analytic",
            element: <h1>kitchen analytic</h1>,
          },
          {
            path: ":id",
            element: <KitchenDetailPage/>,
            children: [
              {
                path:"",
                element : <KitchenProfile/>
              },
              {
                path: "meals",
                element: <KitchenProfileMeal/>
              },
              {
                path: "trays",
                element : <KitchenProfileTray/>
              },
              {
                path: "dishes",
                element: <KitchenProfileDish/>
              }
            ]
          }
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
        path: "/area",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Navigate to="/area/list" replace />,
          },
          {
            path: "list",
            element: <AreaListPage/>,
          },
          {
            path: "analytic",
            element: <h1>promotion analytic</h1>,
          },
        ],
      },
      {
        path: "/feedback",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Navigate to="/feedback/list" replace />,
          },
          {
            path: "list",
            element: <FeedbackListPage/>,
          },
          {
            path: "analytic",
            element: <h1>promotion analytic</h1>,
          },
        ],
      },
      {
        path: "/payment",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Navigate to="/payment/list" replace />,
          },
          {
            path: "list",
            element: <PaymentListPage/>,
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
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export const router = createBrowserRouter(routes);
