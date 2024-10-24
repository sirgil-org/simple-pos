import {
  addOutline,
  listOutline,
  settingsOutline,
} from "ionicons/icons";

import SettingsTab from "../pages/settings";
import OrdersTab from "../pages/orders/orders";
import NewOrderTab from "../pages/new_order";
import ManageInventory from "../pages/settings/manage_inventory";
import { RouteComponentProps } from "react-router";

type IRoute = {
  label: string;
  url: string;
  icon?: string;
  component: React.ComponentType<RouteComponentProps> | React.ComponentType;
  is_child?: boolean;
};

export const tabs: IRoute[] = [
  // {
  //   label: "Reports",
  //   url: "/reports",
  //   icon: statsChartOutline,
  //   component: ReportsTab,
  // },
  {
    label: "New Order",
    url: "/new-order",
    icon: addOutline,
    component: NewOrderTab,
  },
  {
    label: "Orders",
    url: "/orders",
    icon: listOutline,
    component: OrdersTab,
  },

  // {
  //   label: "Expenses",
  //   url: "/expenses",
  //   icon: walletOutline,
  //   component: ExpensesTab,
  // },
  // {
  //   label: "Shops",
  //   url: "/expenses/:id",
  //   component: ShopsPage,
  //   is_child: true,
  // },
  {
    label: "Settings",
    url: "/settings",
    icon: settingsOutline,
    component: SettingsTab,
  },
   {
    label: "Manage Inventory",
    url: "/settings/inventory",
    component: ManageInventory,
    is_child: true,
  },
];
