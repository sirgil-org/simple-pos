import {
  addOutline,
  listOutline,
  settingsOutline,
} from "ionicons/icons";

import SettingsTab from "../pages/settings";
import OrdersTab from "../pages/orders/orders";
import NewOrderTab from "../pages/new_order";

type IRoute = {
  label: string;
  url: string;
  icon?: string;
  component: () => JSX.Element;
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
];
