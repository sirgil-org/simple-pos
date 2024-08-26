import {
  IonList,
  IonSkeletonText,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonNote,
} from "@ionic/react";

export default function OrdersSkeletal() {
  return (
    <IonList>
      {Array(12)
        .fill(1)
        .map((_, index) => (
          <IonItem key={index}>
            <IonLabel>
              <h3>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "80%" }}
                ></IonSkeletonText>
              </h3>
              <p>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "60%" }}
                ></IonSkeletonText>
              </p>
            </IonLabel>
            <IonNote slot="end">
              <IonSkeletonText
                animated={true}
                style={{ width: "50px" }}
              ></IonSkeletonText>
            </IonNote>
          </IonItem>
        ))}
    </IonList>
  );
}
