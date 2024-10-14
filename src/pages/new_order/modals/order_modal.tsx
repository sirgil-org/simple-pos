import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
} from "@ionic/react";
import OrderList from "../components/order_list";
import OrderSummary from "../components/order_summary";
import { useRef } from "react";

function OrderModal({
  modal,
  dismiss,
  products,
  order,
  calculate_total,
  setOrder,
  totalCost,
  inputValue,
  setInputValue,
  onSubmit,
  savingOrder,
  reset_order,
}: any) {


  return (
    <IonModal
      ref={modal}
      trigger="open-modal"
      presentingElement={document.getElementById("main-content")!}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                dismiss();
                reset_order();
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col space-y-5">
          <OrderList
            products={products}
            order={order}
            calculate_total={calculate_total}
            setOrder={setOrder}
          />
          <OrderSummary
            order={order}
            totalCost={totalCost}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSubmit={onSubmit}
            savingOrder={savingOrder}
          />
        </div>
      </IonContent>
    </IonModal>
  );
}

export default OrderModal;
