import {
  IonActionSheet,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { supabase } from "../../supabase_client";

export default function SettingsPage() {
  const router = useIonRouter();

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className="pb-[100px]">
          <IonItem id="logout-action-sheet">
            <IonIcon
              aria-hidden="true"
              icon={logOutOutline}
              slot="start"
              color="danger"
            ></IonIcon>
            <IonLabel>Logout</IonLabel>
          </IonItem>
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
          {
            text: "Cancel",
            role: "cancel",
            data: {
              action: "cancel",
            },
          },
        ]}
      ></IonActionSheet>
    </>
  );
}
