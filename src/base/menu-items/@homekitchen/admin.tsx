// third-party
import { FormattedMessage } from "react-intl";

// assets
import {
  DashboardOutlined,
  CustomerServiceOutlined,
  AreaChartOutlined,
  TableOutlined,
} from "@ant-design/icons";

// type
import { NavItemType } from "@/types/menu";

// icons
const icons = {
  DashboardOutlined,
  CustomerServiceOutlined,
  AreaChartOutlined,
  TableOutlined,
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

export const dashboard: NavItemType = {
  id: "dashboard",
  title: <FormattedMessage id="dashboard" />,
  type: "item",
  url: "/apps/chat",
  icon: icons.DashboardOutlined,
  breadcrumbs: false,
};
export const admin: NavItemType = {
  id: "admin",
  title: <FormattedMessage id="admin" />,
  type: "group",
  children: [
    {
      id: "chat",
      title: <FormattedMessage id="dashboard" />,
      type: "item",
      url: "/dashboard",
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: "customer",
      title: <FormattedMessage id="customer" />,
      type: "collapse",
      icon: icons.CustomerServiceOutlined,
      children: [
        {
          id: "customer-list",
          title: <FormattedMessage id="list" />,
          type: "item",
          icon: icons.TableOutlined,
          url: "/customer/list",
        },
        {
          id: "customer-analytics",
          title: <FormattedMessage id="analytics" />,
          type: "item",
          url: "/customer/analytic",
          icon: icons.AreaChartOutlined,
        },
      ],
    },
    {
        id: "kitchen",
        title: <FormattedMessage id="kitchen" />,
        type: "collapse",
        icon: icons.CustomerServiceOutlined,
        children: [
          {
            id: "kitchen-list",
            title: <FormattedMessage id="list" />,
            type: "item",
            icon: icons.TableOutlined,
            url: "/kitchen/list",
          },
          {
            id: "kitchen-analytics",
            title: <FormattedMessage id="analytics" />,
            type: "item",
            url: "/kitchen/analytic",
            icon: icons.AreaChartOutlined,
          },
        ],
    },
      {
        id: "promotion",
        title: <FormattedMessage id="promotion" />,
        type: "collapse",
        icon: icons.CustomerServiceOutlined,
        children: [
          {
            id: "promotion-list",
            title: <FormattedMessage id="list" />,
            type: "item",
            icon: icons.TableOutlined,
            url: "/promotion/list",
          },
          {
            id: "promotion-analytics",
            title: <FormattedMessage id="analytics" />,
            type: "item",
            url: "/promotion/analytic",
            icon: icons.AreaChartOutlined,
          },
        ],
      },
      {
        id: "order",
        title: <FormattedMessage id="order" />,
        type: "collapse",
        icon: icons.CustomerServiceOutlined,
        children: [
          {
            id: "order-list",
            title: <FormattedMessage id="list" />,
            type: "item",
            icon: icons.TableOutlined,
            url: "/order/list",
          },
          {
            id: "order-analytics",
            title: <FormattedMessage id="analytics" />,
            type: "item",
            url: "/order/analytic",
            icon: icons.AreaChartOutlined,
          },
        ],
      },
  ],
};
