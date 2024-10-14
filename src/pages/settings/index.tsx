import {
  IonActionSheet,
  IonAvatar,
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { supabase } from "../../supabase_client";
import ShopSetupPage from "../onboarding";
import { useState } from "react";

export default function SettingsPage() {
  const [showSetup, setShowSetup] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList inset>
          <IonItem lines="none" color="light">
            <IonAvatar aria-hidden="true" slot="start">
              <img
                alt=""
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>
            <IonLabel>
              <strong>Huey</strong>
              <br />
              <IonText slot="bottom">abpalema@gmail.com</IonText>
            </IonLabel>
          </IonItem>
        </IonList>

        <IonNote class="ion-padding">My Shop</IonNote>
        <IonList inset>
          <IonItem button color="light">
            <IonLabel
              onClick={() => {
                setShowSetup(true);
              }}
            >
              Manage Inventory
            </IonLabel>
          </IonItem>
          <IonItem button color="light">
            <IonLabel>Manage Expenses</IonLabel>
          </IonItem>
        </IonList>

        <IonNote class="ion-padding">Security</IonNote>
        <IonList inset>
          <IonItem button color="light">
            <IonLabel>Change Password</IonLabel>
          </IonItem>
          <IonItem button color="light">
            <IonLabel>Mobile Verification</IonLabel>
          </IonItem>
        </IonList>

        <IonList inset>
          <IonItem color="light">
            <IonToggle>Haptic Feedback</IonToggle>
          </IonItem>
        </IonList>

        <IonNote class="ion-padding">Theme</IonNote>
        <IonList inset>
          <IonItem color="light">
            <IonLabel>System</IonLabel>
            <IonCheckbox slot="end" aria-label="Toggle task completion" />
          </IonItem>
          <IonItem color="light">
            <IonLabel>Light</IonLabel>
            <IonCheckbox slot="end" aria-label="Toggle task completion" />
          </IonItem>
          <IonItem color="light">
            <IonLabel>Dark</IonLabel>
            <IonCheckbox slot="end" aria-label="Toggle task completion" />
          </IonItem>
        </IonList>

        <IonList inset>
          <IonButton expand="block" color="danger" id="logout-action-sheet">
            <IonIcon aria-hidden="true" icon={logOutOutline} />
            <IonLabel>Logout</IonLabel>
          </IonButton>
        </IonList>
      </IonContent>

      <IonActionSheet
        trigger="logout-action-sheet"
        header="You are about to logout"
        buttons={[
          {
            text: "Logout",
            role: "destructive",
            data: {
              action: "delete",
            },
            async handler() {
              await supabase.auth.signOut();
            },
          },
        ]}
      ></IonActionSheet>

      <ShopSetupPage
        title={""}
        showSetup={showSetup}
        setShowSetup={setShowSetup}
      />
    </IonPage>
  );
}
