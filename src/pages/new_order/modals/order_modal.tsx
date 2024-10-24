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
import { INewOrder, IProduct } from "../../../types";
// import { useRef } from "react";

interface IOrderModalProps {
  modal: React.MutableRefObject<HTMLIonModalElement>;
  dismiss: () => void;
  products: IProduct[];
  order: INewOrder;
  calculate_total: (orders: any) => void;
  setOrder: React.Dispatch<React.SetStateAction<INewOrder>>;
  totalCost: number;
  inputValue: number;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: () => Promise<void>;
  savingOrder: boolean;
  reset_order: () => void;
  input_ref: React.MutableRefObject<HTMLIonInputElement>;
}

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
  input_ref,
}: IOrderModalProps) {
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
            inputRef={input_ref}
          />
        </div>
      </IonContent>
    </IonModal>
  );
}

export default OrderModal;
