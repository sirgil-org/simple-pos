import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { Key, useRef, useState } from "react";
import { useCurrentUser } from "../../contexts";
import { useHaptic } from "../../contexts/haptic";
import useQuery from "../../hooks/query";
import { supabase } from "../../supabase_client";
import { IProduct } from "../../types";
import { NewOrderSkeletal } from "./components";
import OrderList from "./components/order_list";
import OrderSummary from "./components/order_summary";
import { OrderModal } from "./modals";

type INewOrder = {
  [product: string]: number;
};

export default function NewOrder() {
  const { currentUser } = useCurrentUser();
  const [present] = useIonToast();

  const { data: products, loading } = useQuery<IProduct[]>({
    table: "products",
    from: 0,
    to: 100,
  });

  const [savingOrder, setSavingOrder] = useState(false);
  const inputRef = useRef<HTMLIonInputElement>(null);

  const [order, setOrder] = useState<INewOrder>({});
  const [inputValue, setInputValue] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const modal = useRef<HTMLIonModalElement>(null);
  const slidingItemRef = useRef<HTMLIonItemSlidingElement>(null);

  const onSubmit = async () => {
    setSavingOrder(true);

    const { data: existing_orders }: any = await supabase
      .from("orders")
      .select("order_number")
      .order("order_number", { ascending: false });

    let new_order_number = 1;

    // no orders on system
    if (existing_orders.length > 0) {
      new_order_number = existing_orders[0].order_number + 1;
    }

    const { data: new_order }: any = await supabase
      .from("orders")
      .insert({
        order_number: new_order_number,
        phone_number: "in store",
        catalog: "in store",
        status: "waiting",
        vendor_id: currentUser.id,
      })
      .select();

    let total_cost = 0;

    const { error }: any = await supabase.from("product_order").insert(
      Object.keys(order).map((key: any) => {
        const item = products.find((product: any) => product.id === key);
        total_cost += item.price * order[key];

        return {
          order_id: new_order[0].id,
          product_id: key,
          quantity: order[key],
          price: item?.price,
        };
      })
    );

    if (inputValue > 0) {
      await supabase.from("payments").insert({
        order_id: new_order[0].id,
        amount_paid: inputValue,
        change: inputValue - total_cost,
      });
    }

    reset_order();
    dismiss();
    setSavingOrder(false);

    if (error) {
      present({
        message: error.message || "Could not create order...",
        duration: 1500,
        position: "top",
        color: "warning",
      });
      return;
    }

    present({
      message: "Order created!",
      duration: 1500,
      position: "top",
      color: "medium",
    });
  };

  const { triggerHeavyFeedback } = useHaptic();

  const calculate_total = (orders: any) => {
    let total_cost = 0;
    Object.keys(orders).forEach((key: any) => {
      const item = products.find((product: any) => product.id === key);
      total_cost += item.price * orders[key];
    });

    setTotalCost(total_cost);
  };

  function dismiss() {
    modal.current?.dismiss();
  }

  const reset_order = () => {
    setTotalCost(0);
    setInputValue(0);
    inputRef.current.value = null;
    setOrder({});
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Create Order</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create Order</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="flex h-full relative space-x-4 ion-padding">
          {loading ? (
            <NewOrderSkeletal />
          ) : (
            <div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 gap-y-4 pb-[200px] w-full">
                {products.map((product: any, key: Key) => {
                  return (
                    <div key={key}>
                      <img
                        className="cursor-pointer w-max aspect-square rounded-lg"
                        key={product.id}
                        src={product.image_url}
                        onClick={() => {
                          void triggerHeavyFeedback();
                          setOrder((prev: any) => {
                            const old_count = order[product.id];

                            const new_data = {
                              ...prev,
                              [product.id]: old_count > 0 ? old_count + 1 : 1,
                            };

                            calculate_total(new_data);
                            return new_data;
                          });
                        }}
                      />
                      <div>
                        <div className="truncate text-ellipsis">
                          {product.title}
                        </div>
                        <div>N$ {product.price}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="min-w-[350px] hidden md:flex flex-col h-full">
            <div className="grow overflow-y-auto px-4">
              <OrderList
                products={products}
                order={order}
                calculate_total={calculate_total}
                setOrder={setOrder}
              />
            </div>

            {/* payment modal */}
            <div className="bg-base-200 rounded-md p-6 mb-5">
              <OrderSummary
                order={order}
                totalCost={totalCost}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSubmit={onSubmit}
                savingOrder={savingOrder}
                inputRef={inputRef}
              />
            </div>
          </div>
        </div>
        <OrderModal
          modal={modal}
          dismiss={dismiss}
          products={products}
          order={order}
          calculate_total={calculate_total}
          setOrder={setOrder}
          totalCost={totalCost}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSubmit={onSubmit}
          savingOrder={savingOrder}
          reset_order={reset_order}
        />
        <IonItemGroup
          className={`${
            Object.keys(order).length === 0 ? "hidden" : ""
          } fixed bottom-0 w-full md:hidden`}
        >
          <IonItemSliding ref={slidingItemRef}>
            <IonItem>
              <div className="w-full grid grid-cols-2 gap-2 pb-2">
                <div>
                  <div className="text-sm">
                    You've added{" "}
                    {Object.values(order).reduce(
                      (sum, value) => sum + value,
                      0
                    )}{" "}
                    Item
                    {Object.values(order).reduce(
                      (sum, value) => sum + value,
                      0
                    ) > 1
                      ? "s"
                      : ""}
                  </div>
                  <div className="text-2xl font-semibold">
                    N$ {totalCost.toFixed(2)}
                  </div>
                </div>
                <IonButton
                  id="open-modal"
                  expand="block"
                  onClick={triggerHeavyFeedback}
                >
                  Continue
                </IonButton>
              </div>
            </IonItem>
            <IonItemOptions
              onIonSwipe={() => {
                reset_order();
                slidingItemRef.current?.close();
              }}
            >
              <IonItemOption
                color="danger"
                expandable={true}
                onClick={() => {
                  reset_order();
                  slidingItemRef.current?.close();
                }}
              >
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </IonItemGroup>
      </IonContent>
    </IonPage>
  );
}
