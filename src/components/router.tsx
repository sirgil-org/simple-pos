import { Switch, Route } from "wouter";
import About from "../pages/about";
import Orders from "../pages/orders/orders";
import NewOrder from "../pages/new_order";
import Reports from "../pages/reports";
import Expenses from "../pages/expenses";


const routes = () => (
    <Switch>
      <Route path="/" component={Orders} />
      <Route path="/about" component={About} />
      <Route path="/new" component={NewOrder} />
      <Route path="/reports" component={Reports} />
      <Route path="/expenses" component={Expenses} />
    </Switch>
);

export default routes;
