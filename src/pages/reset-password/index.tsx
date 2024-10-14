import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function ResetPasswordPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login">Back</IonBackButton>
          </IonButtons>
          <IonTitle>Reset Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ paddingTop: "env(safe-area-inset-top)" }}>
          Reset password
        </div>
      </IonContent>
    </IonPage>
  );
}
