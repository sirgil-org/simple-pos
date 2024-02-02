import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import OnboardingPage from "../../pages/onboarding";
import RegisterPage from "../../pages/register";
import LoginPage from "../../pages/login";
import ResetPasswordPage from "../../pages/reset-password";
import { Tabs } from "./tabs";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase_client";

const Routes = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data);
    })();
  }, []);
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route
          path="/tabs"
          render={() => (session ? <Tabs /> : <Redirect to="/login" />)}
        />
        <Route exact path="/welcome" component={OnboardingPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route exact path="/">
          <Redirect to="/tabs/orders" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routes;
