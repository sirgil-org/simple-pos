import { Switch, Route } from "wouter";
import About from "../pages/about";
import Orders from "../pages/orders";


const routes = () => (
    <Switch>
      <Route path="/" component={Orders} />
      <Route path="/about" component={About} />
    </Switch>
);

export default routes;
