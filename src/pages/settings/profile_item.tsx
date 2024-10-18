import { IonList, IonItem, IonAvatar, IonLabel, IonText } from "@ionic/react";
import { useCurrentUser } from "../../contexts";

function ProfileComponent() {
  const { currentUser, userData } = useCurrentUser();


  return (
    <IonList inset>
      <IonItem lines="none" color="light">
        <IonAvatar aria-hidden="true" slot="start">
          <img
            alt=""
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </IonAvatar>
        <IonLabel>
          <strong>{userData.name}</strong>
          <br />
          <IonText slot="bottom">{currentUser.email}</IonText>
        </IonLabel>
      </IonItem>
    </IonList>
  );
}

export default ProfileComponent;
