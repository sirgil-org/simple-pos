import { Route, Redirect } from "react-router-dom";
// import About from "../pages/about";
// import Orders from "../pages/orders/orders";
// import NewOrder from "../pages/new_order";
// import Reports from "../pages/reports";
// import Expenses from "../pages/expenses";
import { IonRouterOutlet } from "@ionic/react";
import Tabs from "./tabs";

const routes = () => (
  <IonRouterOutlet>
    {/* <Route exact path="/" component={Orders} /> */}
    {/* <Route exact path="/about" component={About} />
      <Route exact path="/new" component={NewOrder} />
      <Route exact path="/reports" component={Reports} />
      <Route exact path="/expenses" component={Expenses} /> */}
    <Route path="/tabs" render={() => <Tabs />} />
    <Route exact path="/">
      <Redirect to="/tabs" />
    </Route>
  </IonRouterOutlet>
);

export default routes;
