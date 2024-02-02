import { IonContent, IonPage } from "@ionic/react";

export default function ResetPasswordPage() {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ paddingTop: "env(safe-area-inset-top)" }}>Reset password</div>
      </IonContent>
    </IonPage>
  );
}
