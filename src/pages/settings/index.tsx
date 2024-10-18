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
  useIonRouter,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { supabase } from "../../supabase_client";
import { useState } from "react";
import { useHaptic } from "../../contexts/haptic";
import { NotificationType } from "@capacitor/haptics";
import ProfileComponent from "./profile_item";

export default function SettingsPage() {
  const {
    triggerLightFeedback,
    triggerNotification,
  } = useHaptic();
  const [selectedCheckbox, setSelectedCheckbox] = useState<number | null>(null);
  const { isEnabled, setIsEnabled } = useHaptic();

  const handleCheckboxChange = (index: number) => {
    void triggerLightFeedback();
    setSelectedCheckbox(index === selectedCheckbox ? null : index); // Toggle the checkbox
  };

  const router = useIonRouter();

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

        <ProfileComponent />

        <IonNote class="ion-padding">My Shop</IonNote>
        <IonList inset>
          <IonItem button color="light">
            <IonLabel
              onClick={() => {
                void triggerLightFeedback()
                router.push("settings/inventory");
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
            <IonToggle
              checked={isEnabled}
              onIonChange={(e) => setIsEnabled(e.detail.checked)}
            >
              Haptic Feedback
            </IonToggle>
          </IonItem>
        </IonList>

        <IonNote class="ion-padding">Theme</IonNote>
        <IonList inset>
          <IonItem color="light">
            <IonLabel>System</IonLabel>
            <IonCheckbox
              slot="end"
              aria-label="Toggle System Theme"
              checked={selectedCheckbox === 0}
              onIonChange={() => handleCheckboxChange(0)}
            />
          </IonItem>
          <IonItem color="light">
            <IonLabel>Light</IonLabel>
            <IonCheckbox
              slot="end"
              aria-label="Toggle Light Theme"
              checked={selectedCheckbox === 1}
              onIonChange={() => handleCheckboxChange(1)}
            />
          </IonItem>
          <IonItem color="light">
            <IonLabel>Dark</IonLabel>
            <IonCheckbox
              slot="end"
              aria-label="Toggle Dark Theme"
              checked={selectedCheckbox === 2}
              onIonChange={() => handleCheckboxChange(2)}
            />
          </IonItem>
        </IonList>

        <IonList inset>
          <IonButton
            expand="block"
            color="danger"
            onClick={() => {
              void triggerNotification(NotificationType.Warning);
            }}
            id="logout-action-sheet"
          >
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
    </IonPage>
  );
}
