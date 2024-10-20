import {
  IonContent,
  IonSkeletonText
} from "@ionic/react";

export default function ReportSkeletal() {
  return (
    <IonContent>
      <IonSkeletonText animated={true} style={{ height: "60%" }} />
      <IonSkeletonText animated={true} style={{ height: "200px" }} />
      <IonSkeletonText animated={true} style={{ height: "200px" }} />
    </IonContent>
  );
}
