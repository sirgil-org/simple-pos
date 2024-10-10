import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItemGroup,
  IonItem,
  IonLabel,
  IonNote,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { format } from "date-fns";

export default function OrderDetailsModal({
  dismiss,
  selectedOrder,
  isOpen,
}: any) {
  return (
    <IonModal
      isOpen={isOpen}
      initialBreakpoint={0.5}
      breakpoints={[0, 0.5, 0.75]}
      onWillDismiss={dismiss}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>#{selectedOrder?.order_number}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => dismiss()}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Status</IonLabel>
            <IonNote slot="end" className="capitalize">
              {selectedOrder.status}
            </IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Created</IonLabel>
            {selectedOrder?.created_at && (
              <IonNote slot="end">
                {format(new Date(selectedOrder?.created_at), "dd MMM yyyy")}{" at "}
                {format(new Date(selectedOrder?.created_at), "HH:mm")}
              </IonNote>
            )}
          </IonItem>
          <IonItem>
            <IonLabel>Total</IonLabel>
            <IonNote slot="end">
              N${" "}
              {selectedOrder.product_order?.reduce(
                (a, b) => a + b.price * b.quantity,
                0
              )}
            </IonNote>
          </IonItem>
        </IonList>
        <IonList inset={true}>
          <IonListHeader>Summary</IonListHeader>
          {selectedOrder?.product_order?.map((order: any) => (
            <IonItem key={order.product_id}>
              <IonLabel>
                {order.quantity} x {order.products.title}
              </IonLabel>
              <IonNote slot="end">N$ {order.quantity * order.price}</IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
}
