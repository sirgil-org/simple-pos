import React, { Key, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../supabase_client";
import { NewOrderSkeletal } from "./components";
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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OrderModal } from "./modals";
import OrderList from "./components/order_list";
import OrderSummary from "./components/order_summary";
import { trash } from "ionicons/icons";

export default function NewOrder() {
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [products, setProducts]: any = useState([]);

  const [order, setOrder]: any = useState({});
  const [inputValue, setInputValue] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const modal = useRef<HTMLIonModalElement>(null);
  const slidingItemRef = useRef<HTMLIonItemSlidingElement>(null);

  const fetchData = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("products").select();

    if (error) {
      toast.warn(error.message || "Could not fetch orders...");
    } else if (data) {
      setProducts(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      })
      .select();

    let total_cost = 0;

    const { error }: any = await supabase.from("product_order").insert(
      Object.keys(order).map((key: any) => {
        const item = products.find((product: any) => product.sku === key);
        total_cost += item.price * order[key];

        return {
          order_id: new_order[0].id,
          sku: key,
          quantity: order[key],
          price: item?.price,
        };
      })
    );

    await supabase.from("payments").insert({
      order_id: new_order[0].id,
      amount_paid: inputValue,
      change: inputValue - total_cost,
    });

    reset_order();
    dismiss();
    setSavingOrder(false);

    if (error) {
      return toast.error(error.msg || "Could not create order...");
    }

    toast.success("Order created...");
  };

  const calculate_total = (orders: any) => {
    let total_cost = 0;
    Object.keys(orders).forEach((key: any) => {
      const item = products.find((product: any) => product.sku === key);
      total_cost += item.price * orders[key];
    });

    setTotalCost(total_cost);
  };

  function dismiss() {
    modal.current?.dismiss();
  }

  const reset_order = () => {
    setTotalCost(0);
    setInputValue("0");
    setOrder({});
  };

  return (
    <>
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
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {products.map((product: any, key: Key) => {
                  return (
                    <div key={key}>
                      <img
                        className="cursor-pointer w-max"
                        key={product.sku}
                        src={product.image_url}
                        onClick={() => {
                          setOrder((prev: any) => {
                            const old_count = order[product.sku];

                            const new_data = {
                              ...prev,
                              [product.sku]: old_count > 0 ? old_count + 1 : 1,
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
          } fixed bottom-0 w-full`}
        >
          <IonItemSliding ref={slidingItemRef}>
            <IonItem>
              <div className="w-full grid grid-cols-2 gap-2 pb-2">
                <div>
                  <div className="text-sm">
                    You've added {Object.keys(order).length} Item
                    {Object.keys(order).length > 1 ? "s" : ""}
                  </div>
                  <div className="text-2xl font-semibold">
                    N$ {totalCost}
                  </div>
                </div>
                <IonButton id="open-modal" expand="block">
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
    </>
  );
}
