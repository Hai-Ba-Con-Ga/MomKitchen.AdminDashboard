// third-party
import { FormattedMessage } from "react-intl";

// assets
import {
  DashboardOutlined,
  CustomerServiceOutlined,
  AreaChartOutlined,
  TableOutlined,
  ForkOutlined,
  SnippetsOutlined,
  ShopOutlined,
} from "@ant-design/icons";

// type
import { NavItemType } from "@/types/menu";

// icons
const icons = {
  DashboardOutlined,
  CustomerServiceOutlined,
  AreaChartOutlined,
  TableOutlined,
  ForkOutlined,
  SnippetsOutlined,
  ShopOutlined,
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
      id: "order",
      title: <FormattedMessage id="order" />,
      type: "collapse",
      icon: icons.SnippetsOutlined,
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
      icon: icons.ForkOutlined,
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
      id: "area",
      title: <FormattedMessage id="area" />,
      type: "collapse",
      icon: icons.ShopOutlined,
      children: [
        {
          id: "area-list",
          title: <FormattedMessage id="list" />,
          type: "item",
          icon: icons.TableOutlined,
          url: "/area/list",
        },
        {
          id: "area-analytics",
          title: <FormattedMessage id="analytics" />,
          type: "item",
          url: "/area/analytic",
          icon: icons.AreaChartOutlined,
        },
      ],
    },
    {
      id: "feedback",
      title: <FormattedMessage id="feedback" />,
      type: "collapse",
      icon: icons.ShopOutlined,
      children: [
        {
          id: "feedback-list",
          title: <FormattedMessage id="list" />,
          type: "item",
          icon: icons.TableOutlined,
          url: "/feedback/list",
        },
        {
          id: "feedback-analytics",
          title: <FormattedMessage id="analytics" />,
          type: "item",
          url: "/feedback/analytic",
          icon: icons.AreaChartOutlined,
        },
      ],
    },
    {
      id: "payment-type",
      title: <FormattedMessage id="payment-type" />,
      type: "collapse",
      icon: icons.ShopOutlined,
      children: [
        {
          id: "payment-type-list",
          title: <FormattedMessage id="list" />,
          type: "item",
          icon: icons.TableOutlined,
          url: "/payment-type/list",
        },
        {
          id: "payment-type-analytics",
          title: <FormattedMessage id="analytics" />,
          type: "item",
          url: "/payment-type/analytic",
          icon: icons.AreaChartOutlined,
        },
      ],
    },
  ],
};
