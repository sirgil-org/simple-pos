import {
  addOutline,
  walletOutline,
  statsChartOutline,
  listOutline,
  informationCircleOutline,
} from "ionicons/icons";

import AboutTab from "../../pages/about";
import OrdersTab from "../../pages/orders/orders";
import NewOrderTab from "../../pages/new_order";
import ReportsTab from "../../pages/reports";
import ExpensesTab from "../../pages/expenses";
import { ShopsPage } from "../../pages/expenses/components";

export const tabs: any = [
  {
    label: "New Order",
    url: "/new-order",
    icon: addOutline,
    // color: "#76b140",
    // backgroundColor: "#ddf7c5",
    component: NewOrderTab,
  },
  {
    label: "Orders",
    url: "/orders",
    icon: listOutline,
    component: OrdersTab,
  },
  {
    label: "Reports",
    url: "/reports",
    icon: statsChartOutline,
    component: ReportsTab,
  },
  {
    label: "Expenses",
    url: "/expenses",
    icon: walletOutline,
    component: ExpensesTab,
  },
  {
    label: "Shops",
    url: "/expenses/shops/:id",
    icon: walletOutline,
    component: ShopsPage,
    isChild: true,
  },
  {
    label: "About",
    url: "/about",
    icon: informationCircleOutline,
    component: AboutTab,
  },
];
