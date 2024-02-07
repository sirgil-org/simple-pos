import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { tabs } from "./tab_routes";
import { SplitPaneWrapper } from "./split_pane_wrapper";

export const Tabs: React.FC = () => (
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
