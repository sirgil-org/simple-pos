import { Redirect, Route, useRouteMatch } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonToast,
} from "@ionic/react";
import { tabs } from "./tab_routes";
import { useEffect, useState } from "react";
import ShopSetupPage from "../pages/onboarding";
import { useCurrentUser } from "../contexts";
import { supabase } from "../supabase_client";

export const Tabs: React.FC = () => {
  const { url } = useRouteMatch();
  const { currentUser } = useCurrentUser();

  const [showSetup, setShowSetup] = useState(false);
  const [present] = useIonToast();

  useEffect(() => {
    const checkInventory = async (id) => {
      const { count, error } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("vendor_id", id);

      if (error) {
        present({
          message: error.message,
          duration: 1500,
          position: "top",
          color: "warning",
        });
      } else if (count < 2) {
        setShowSetup(true);
      }
    };
    checkInventory(currentUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <IonTabs>
        <IonRouterOutlet id="main-content">
          <Redirect exact path={`${url}`} to={`${url}/orders`} />

          {tabs.map((tab, index) => (
            <Route
              key={index}
              exact={tab.is_child ? false : true}
              path={`${url}${tab.url}`}
              render={(props) => {
                return <tab.component {...props} />;
              }}
            />
          ))}

          <Route exact path={`${url}`}>
            <Redirect to={`${url}/orders`} />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" translucent className="md:hidden">
          {tabs
            .filter((item) => !item.is_child)
            .map((tab, index) => (
              <IonTabButton
                key={index}
                tab={tab.label.toLocaleLowerCase()}
                href={`${url}${tab.url}`}
              >
                <IonIcon icon={tab.icon} />
                <IonLabel>{tab.label}</IonLabel>
              </IonTabButton>
            ))}
        </IonTabBar>
      </IonTabs>
      <ShopSetupPage showSetup={showSetup} setShowSetup={setShowSetup} />
    </>
  );
};
