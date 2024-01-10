import PageRouter, { tabs } from "./components/router.tsx";
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
  IonLabel,
  IonList,
  IonMenu,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import "./theme/variables.css";

setupIonicReact();

// Home function that is reflected across the site
export default function App() {
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
                .map((tab) => {
                  return (
                    <IonItem
                      className="mb-5"
                      href={tab.url}
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
          <PageRouter />
        </div>
      </IonSplitPane>
    </IonApp>
  );
}
