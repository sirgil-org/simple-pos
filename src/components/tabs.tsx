import { Redirect, Route } from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
// import Tab1 from './pages/Tab1';
// import Tab2 from './pages/Tab2';
// import Tab3 from './pages/Tab3';

import AboutTab from "../pages/about";
import OrdersTab from "../pages/orders/orders";
import NewOrderTab from "../pages/new_order";
import ReportsTab from "../pages/reports";
import ExpensesTab from "../pages/expenses";

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/tabs/new-order">
        <NewOrderTab />
      </Route>
      <Route exact path="/tabs/orders">
        <OrdersTab />
      </Route>
      <Route path="/tabs/reports">
        <ReportsTab />
      </Route>
      <Route path="/tabs/expenses">
        <ExpensesTab />
      </Route>
      <Route path="/tabs/about">
        <AboutTab />
      </Route>
      <Route exact path="/tabs">
        <Redirect to="/tabs/new-order" />
      </Route>
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="new-order" href="/tabs/new-order">
        <IonIcon icon={triangle} />
        <IonLabel>New Order</IonLabel>
      </IonTabButton>
      <IonTabButton tab="orders" href="/tabs/orders">
        <IonIcon icon={ellipse} />
        <IonLabel>Orders</IonLabel>
      </IonTabButton>
      <IonTabButton tab="reports" href="/tabs/reports">
        <IonIcon icon={square} />
        <IonLabel>Reports</IonLabel>
      </IonTabButton>
      <IonTabButton tab="expenses" href="/tabs/expenses">
        <IonIcon icon={square} />
        <IonLabel>Expenses</IonLabel>
      </IonTabButton>
      <IonTabButton tab="about" href="/tabs/about">
        <IonIcon icon={square} />
        <IonLabel>About</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;