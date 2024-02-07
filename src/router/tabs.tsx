import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
} from "@ionic/react";
import { tabs } from "./tab_routes";
import { SplitPaneWrapper } from "./split_pane_wrapper";
import { useEffect } from "react";
import { supabase } from "../supabase_client";

export const Tabs: React.FC = () => {
  const router = useIonRouter();

  const setup = async () => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "INITIAL_SESSION") {
        console.log(session, " ----- initial session");
        if (session === null) {
          router.push("/login", "root", "replace");
        }
        // handle initial session
        console.log("INITIAL_SESSION");
      } else if (_event === "SIGNED_IN") {
        // handle sign in event
        console.log("SIGNED_IN");
      } else if (_event === "SIGNED_OUT") {
        // handle sign out event
        console.log("SIGNED_OUT");
        router.push("/login", "root", "replace");
      } else if (_event === "PASSWORD_RECOVERY") {
        // handle password recovery event
        console.log("PASSWORD_RECOVERY");
      } else if (_event === "TOKEN_REFRESHED") {
        // handle token refreshed event
        console.log("TOKEN_REFRESHED");
      } else if (_event === "USER_UPDATED") {
        // handle user updated event
        console.log("USER_UPDATED");
      }

      console.log(session, "---- session...");
    });
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <SplitPaneWrapper>
      <IonTabs>
        <IonRouterOutlet id="main-content">
          <Redirect exact path="/tabs" to="/tabs/orders" />
          {tabs.map((tab, index) => (
            <Route
              key={index}
              exact
              path={"/tabs" + tab.url}
              render={(props) => {
                return <tab.component {...props} />;
              }}
            />
          ))}
          <Route exact path="/tabs">
            <Redirect to="/tabs/orders" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" translucent className="md:hidden">
          {tabs
            .filter((item) => !item.isChild)
            .map((tab, index) => (
              <IonTabButton
                key={index}
                tab={tab.label.toLocaleLowerCase()}
                href={"/tabs" + tab.url}
              >
                <IonIcon icon={tab.icon} />
                <IonLabel>{tab.label}</IonLabel>
              </IonTabButton>
            ))}
        </IonTabBar>
      </IonTabs>
    </SplitPaneWrapper>
  );
};
