import { IonSkeletonText } from "@ionic/react";

export default function NewOrderSkeletal() {
  return (
    <div className="h-full w-full">
      <div role="status" className="grid grid-cols-3 gap-2">
        {Array(6)
          .fill(1)
          .map((_, index) => (
            <div key={index}>
              <div className="aspect-square">
                <IonSkeletonText
                  animated={true}
                  className="h-full"
                ></IonSkeletonText>
              </div>
              <p>
                <IonSkeletonText
                  animated={true}
                ></IonSkeletonText>
              </p>
              <p>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "30%" }}
                ></IonSkeletonText>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
