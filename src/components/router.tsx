import { Route, Redirect } from "react-router";

import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";

import {
  addOutline,
  walletOutline,
  statsChartOutline,
  listOutline,
  informationCircleOutline,
} from "ionicons/icons";

import AboutTab from "../pages/about";
import OrdersTab from "../pages/orders/orders";
import NewOrderTab from "../pages/new_order";
import ReportsTab from "../pages/reports";
import ExpensesTab from "../pages/expenses";
import { ShopsPage } from "../pages/expenses/components";

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

const routes = () => (
  <IonReactRouter>
    <IonRouterOutlet>
      <Route
        path="/"
        render={() => (
          <IonTabs>
            <IonRouterOutlet id="main-content">
              {tabs.map((tab, index) => (
                <Route
                  key={index}
                  exact
                  path={tab.url}
                  render={(props) => {
                    return <tab.component {...props} />;
                  }}
                />
              ))}
              <Route exact path="/">
                <Redirect exact to="/orders" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom" translucent className="md:hidden">
              {tabs
                .filter((item) => !item.isChild)
                .map((tab, index) => (
                  <IonTabButton
                    key={index}
                    tab={tab.label.toLocaleLowerCase()}
                    href={tab.url}
                  >
                    <IonIcon icon={tab.icon} />
                    <IonLabel>{tab.label}</IonLabel>
                  </IonTabButton>
                ))}
            </IonTabBar>
          </IonTabs>
        )}
      />
      <Route exact path="/">
        <Redirect to="/orders" />
      </Route>
    </IonRouterOutlet>
  </IonReactRouter>
);

export default routes;
