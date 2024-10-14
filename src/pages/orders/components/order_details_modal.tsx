import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonNote,
  IonList,
  IonListHeader,
  IonInput,
} from "@ionic/react";
import { format } from "date-fns";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase_client";

export default function OrderDetailsModal({
  dismiss,
  selectedOrder,
  isOpen,
}: any) {
  const [savingOrder, setSavingOrder] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    console.log(selectedOrder);
    if (selectedOrder) {
      setTotalCost(
        selectedOrder.product_order?.reduce(
          (a, b) => a + b.price * b.quantity,
          0
        )
      );
    }
  }, [selectedOrder]);

  const onSubmit = async () => {
    setSavingOrder(true)
    await supabase.from("payments").insert({
      order_id: selectedOrder.id,
      amount_paid: inputValue,
      change: inputValue - totalCost,
    });
    setSavingOrder(false)
    dismiss()
  };
  return (
    <IonModal
      isOpen={isOpen}
      // initialBreakpoint={0.5}
      // breakpoints={[0, 0.5, 0.75]}
      presentingElement={document.getElementById("main-content")!}
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
        <IonList inset>
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
                {format(new Date(selectedOrder?.created_at), "dd MMM yyyy")}
                {" at "}
                {format(new Date(selectedOrder?.created_at), "HH:mm")}
              </IonNote>
            )}
          </IonItem>
          <IonItem>
            <IonLabel>Total</IonLabel>
            <IonNote slot="end">N$ {totalCost?.toFixed(2)}</IonNote>
          </IonItem>
        </IonList>
        <IonList inset>
          <IonListHeader color="light">Summary</IonListHeader>
          {selectedOrder?.product_order?.map((order: any) => (
            <IonItem key={order.product_id} color="light">
              <IonLabel>
                {order.quantity} x {order.products.title}
              </IonLabel>
              <IonNote slot="end">
                N$ {(order.quantity * order.price)?.toFixed(2)}
              </IonNote>
            </IonItem>
          ))}
        </IonList>

        {selectedOrder?.payments ? (
          <IonList inset>
            <IonListHeader color="light">Payment Info</IonListHeader>
            <IonItem lines="none" color="light">
              <IonLabel>
                <div className="flex justify-between">
                  <div>Paid: </div>
                  <div>N${selectedOrder?.payments?.amount_paid}</div>
                </div>
                <div className="flex justify-between">
                  <div>Change: </div>
                  <div>{selectedOrder?.payments.change.toFixed(2)}</div>
                </div>
              </IonLabel>
            </IonItem>
          </IonList>
        ) : (
          <IonList>
            <IonItem className="my-6" lines="none">
              <IonInput
                id="amount"
                type="text"
                label="Amount Paid"
                labelPlacement="stacked"
                fill="outline"
                inputMode="decimal"
                autoFocus
                placeholder="0.00"
                helperText={
                  inputValue
                    ? `Change: ${(inputValue - totalCost)?.toFixed(2)}`
                    : ""
                }
                autofocus
                // ref={inputRef}
                onIonInput={(e) =>
                  setInputValue(parseFloat(e.target.value.toString()))
                }
              />
            </IonItem>

            <IonItem lines="none">
              <button
                type="submit"
                disabled={totalCost > inputValue}
                onClick={onSubmit}
                className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {savingOrder ? <Spinner /> : "Update Order"}
              </button>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonModal>
  );
}
