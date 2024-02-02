import { tabs } from "./components/router/tab_routes.ts";
import PageRouter from "./components/router/router.tsx"
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonSplitPane,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import "./theme/variables.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./swiper_styles.css";
import { useEffect } from "react";
import { supabase } from "./supabase_client.ts";
import AppUrlListener from "./app_url_listener";

setupIonicReact();

// Home function that is reflected across the site
export default function App() {
  const setup = async () => {
    // const { data, error } = await supabase.auth.getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "INITIAL_SESSION") {
        // handle initial session
        console.log("INITIAL_SESSION");
      } else if (_event === "SIGNED_IN") {
        // handle sign in event
        console.log("SIGNED_IN");

      } else if (_event === "SIGNED_OUT") {
        // handle sign out event
        console.log("SIGNED_OUT");
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
    <IonApp>
      <IonSplitPane when="md" contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>{/* <IonTitle>Menu</IonTitle> */}</IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
              {tabs
                .filter((item) => !item.isChild)
                .map((tab, index) => {
                  return (
                    <IonItem
                      className="mb-5"
                      key={index}
                      href={'/tabs'+tab.url}
                      detail={false}
                      button={true}
                      lines="none"
                      color="transparent"
                    >
                      <IonIcon icon={tab.icon} size="large" />
                    </IonItem>
                  );
                })}
            </IonList>
          </IonContent>
        </IonMenu>

        <div className="ion-page" id="main">
          <AppUrlListener />
          <PageRouter />
        </div>
      </IonSplitPane>
    </IonApp>
  );
}
