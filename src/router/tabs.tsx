import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { tabs } from "./tab_routes";
import { SplitPaneWrapper } from "./split_pane_wrapper";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase_client";
import { AuthContext } from "../contexts";
import ShopSetupPage from "../pages/onboarding";

export const Tabs: React.FC = ({ match }) => {
  const router = useIonRouter();
  const [showSetup, setShowSetup] = useState(false);
  const [present] = useIonToast();

  const [currentUser, setCurrentUser] = useState(null);

  const checkInventory = async (id) => {
    const { count, error } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("vendor_id", id);

    console.log(count, " ----0000---___======");
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

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (_event === "INITIAL_SESSION" || _event === "SIGNED_IN") {
          if (session === null) {
            router.push("/login", "root", "replace");
            return;
          } else {
            console.log("getting inventory count ........", session.user.id);
            checkInventory(session.user.id);

            setCurrentUser(session.user);
            router.push("/tabs", "root", "replace");
            console.log(_event, " headed to tabs");
          }
        } else if (_event === "SIGNED_OUT") {
          setCurrentUser(null);
          console.log("SIGNED_OUT");
          router.push("/login", "root", "replace");
        }
      }
    );

    return () => {
      authListener.subscription?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [present]);

  return (
    <>
      {currentUser && (
        <AuthContext.Provider value={currentUser}>
          <IonTabs>
            <IonRouterOutlet id="main-content">
              <Redirect
                exact
                path={`${match.url}`}
                to={`${match.url}/orders`}
              />

              {tabs.map((tab, index) => (
                <Route
                  key={index}
                  exact={tab.is_child ? false : true}
                  path={`${match.url}${tab.url}`}
                  render={(props) => {
                    return <tab.component {...props} />;
                  }}
                />
              ))}

              <Route exact path={`${match.url}`}>
                <Redirect to={`${match.url}/orders`} />
              </Route> 
            </IonRouterOutlet>
            <IonTabBar slot="bottom" translucent className="md:hidden">
              {tabs
                .filter((item) => !item.is_child)
                .map((tab, index) => (
                  <IonTabButton
                    key={index}
                    tab={tab.label.toLocaleLowerCase()}
                    href={`${match.url}${tab.url}`}
                  >
                    <IonIcon icon={tab.icon} />
                    <IonLabel>{tab.label}</IonLabel>
                  </IonTabButton>
                ))}
            </IonTabBar>
          </IonTabs>
          <ShopSetupPage showSetup={showSetup} setShowSetup={setShowSetup} />
        </AuthContext.Provider>
      )}
    </>
  );
};
