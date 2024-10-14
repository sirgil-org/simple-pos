import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import ResetPasswordPage from "../pages/reset-password";
import { Tabs } from "./tabs";
import { AuthContextProvider } from "../contexts";
import ProtectedRoute from "./protected_route";
import { useEffect } from "react";

const Routes = () => {
  useEffect(()=>{
    console.log("in routes")
  })
  return (
    <AuthContextProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/tabs">
            <ProtectedRoute>
              <Tabs />
            </ProtectedRoute>
          </Route>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/reset-password" component={ResetPasswordPage} />
          <Route exact path="/">
            <Redirect to="/tabs" />
          </Route>
          <Route render={() => <Redirect to={"/login"} />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthContextProvider>
  );
};

export default Routes;
