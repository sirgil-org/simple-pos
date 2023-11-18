import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
} from "@ionic/react";
import moment from "moment";

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
      <IonContent className="ion-padding">
        <div className="flex flex-col space-y-5">
          <div className="flex justify-between">
            <div>Created</div>
            <div> {moment(selectedOrder?.created_at).fromNow()}</div>
          </div>
          {selectedOrder?.product_order?.map((order: any) => (
            <div key={order.sku} className="flex justify-between">
              <div>
                {order.quantity} x {order.products.title}
              </div>
              <div>N$ {order.quantity * order.price}</div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonModal>
  );
}
