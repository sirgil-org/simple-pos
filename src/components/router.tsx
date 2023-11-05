import { Switch, Route } from "wouter";
import About from "../pages/about";
import Orders from "../pages/orders/orders";
import NewOrder from "../pages/new_order";


const routes = () => (
    <Switch>
      <Route path="/" component={Orders} />
      <Route path="/about" component={About} />
      <Route path="/new" component={NewOrder} />
    </Switch>
);

export default routes;
