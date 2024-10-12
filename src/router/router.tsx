import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import OnboardingPage from "../pages/onboarding";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import ResetPasswordPage from "../pages/reset-password";
import { Tabs } from "./tabs";

const Routes = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/tabs" component={Tabs} />
        <Route path="/welcome" component={OnboardingPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
        <Route render={() => <Redirect to={"/welcome"} />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routes;
