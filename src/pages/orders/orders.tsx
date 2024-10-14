import { useEffect, useState } from "react";
import { supabase } from "../../supabase_client";
import { toast } from "react-toastify";

import OrdersSkeletal from "./components/orders_skeletal";
import {
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";

import {
  arrowForward,
  banOutline,
  checkmark,
  checkmarkDoneOutline,
} from "ionicons/icons";

import OrderDetailsModal from "./components/order_details_modal";
import possibleStatus, {
  possibleStatusWithIcons,
} from "../../constants/status";

import useQuery from "../../hooks/query";

enum Filters {
  ALL = "all",
  WAITING = "waiting",
  PREPARING = "preparing",
  COLLECTED = "collected",
  CANCELLED = "cancelled",
  READY = "ready",
}

export default function OrdersPage() {  
  const [present] = useIonToast()
  const [filteredOrders, setFilteredOrders]: any = useState([]);
  const { data: orders, loading } = useQuery<any[]>({
    table: "orders",
    from: 0,
    to: 100,
    filter: `
      id, 
      order_number, 
      status,
      created_at,
      phone_number,
      product_order ( 
        product_id, 
        quantity, 
        created_at, 
        order_id, 
        price,
        products (
          title
        )
      ),
      payments (
        amount_paid,
        change
      )
  `,
    order: { column: "created_at", ascending: false },
    cb: setFilteredOrders,
  });

  const [selectedOrder, setSelectedOrder]: any = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleChangeStatus = async (status: string, currentOrder: any) => {
    const to_update: any = { status };

    switch (status) {
      case "preparing":
        to_update.preparing_at = new Date();
        break;
      case "ready":
        to_update.completed_at = new Date();
        break;

      case "collected":
        to_update.collected_at = new Date();
        break;

      case "cancelled":
        to_update.cancelled_at = new Date();
        break;
    }

    const { error } = await supabase
      .from("orders")
      .update(to_update)
      .eq("id", currentOrder.id);

    if (error) {
      present({
        message: error.message || "Could not update",
        duration: 1500,
        position: "top",
        color: "warning",
      });
      return
    }

    // setOrders((prev: any) => {
    //   const index = prev.findIndex((p: any) => p.id === currentOrder.id);
    //   prev[index] = { ...prev[index], status };

    //   // Should only be added to filtered orders if all is selected
    //   // since if the status is changed the current filter won't apply
    //   if (activeFilter === "all") {
    //     setFilteredOrders(prev);
    //   } else {
    //     setFilteredOrders((prev_filtered: any) => {
    //       const new_data = prev_filtered.filter(
    //         (item: any) => item.id !== currentOrder.id
    //       );
    //       return new_data;
    //     });
    //   }

    //   // Only way for the UI to update realtime, if just prev is returned
    //   // it won't work as expected. My assumption is that it's memory issue,
    //   // probably assigning by memory location.
    //   return [...prev];
    // });

    //slidingItemRef.current.get(currentOrder.id).close();
  };

  function dismiss() {
    setIsOpen(false);
  }

  async function onFilterChange(value: string) {
    setActiveFilter(value);

    if (value === Filters.ALL) {
      return setFilteredOrders(orders);
    }

    setFilteredOrders(orders.filter((o: any) => o.status === value));
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Orders</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Orders</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonList>
              {Object.values(Filters).map((filter, index: number) => (
                <IonChip
                  key={index}
                  onClick={() => onFilterChange(filter)}
                  className="capitalize"
                  color={filter === activeFilter ? "primary" : "medium"}
                >
                  {filter}
                </IonChip>
              ))}
            </IonList>
          </IonToolbar>
        </IonHeader>

        {loading ? (
          <OrdersSkeletal />
        ) : (
          <>
            <IonList className="pb-[100px]">
              {filteredOrders.map((order: any, index: number) => (
                <IonItemSliding
                  key={order.id}
                  /*ref={(node) => {
                    const map = getMap();
                    if (node) {
                      map.set(order.id, node);
                    } else {
                      map.delete(order.id);
                    }
                  }}*/
                >
                  <IonItem
                    button
                    key={index}
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsOpen(true);
                    }}
                  >
                    <IonIcon
                      slot="start"
                      icon={possibleStatusWithIcons[order.status]}
                    ></IonIcon>

                    <IonLabel>
                      {order.product_order.map(
                        (order: any) =>
                          ` ${order.quantity}  x ${order.products.title}, `
                      )}
                      <div>
                        N${" "}
                        {(order.product_order.reduce(
                          (a, b) => a + b.price * b.quantity,
                          0
                        )).toFixed(2)}
                      </div>
                    </IonLabel>
                    <IonNote slot="end">#{order.order_number}</IonNote>
                  </IonItem>
                  {!["collected", "cancelled"].includes(order.status) && (
                    <IonItemOptions
                      side="start"
                      onIonSwipe={async () => {
                        await handleChangeStatus(
                          possibleStatus[
                            possibleStatus.indexOf(order.status.toLowerCase()) +
                              1
                          ],
                          order
                        );
                      }}
                    >
                      <IonItemOption color="success" expandable={true}>
                        <IonIcon slot="icon-only" icon={arrowForward}></IonIcon>
                      </IonItemOption>
                    </IonItemOptions>
                  )}

                  {!["collected", "cancelled"].includes(order.status) && (
                    <IonItemOptions
                      side="end"
                      onIonSwipe={async () => {
                        await handleChangeStatus("cancelled", order);
                      }}
                    >
                      {!["ready", "cancelled"].includes(order.status) && (
                        <IonItemOption
                          color="primary"
                          expandable={true}
                          onClick={async () => {
                            await handleChangeStatus("ready", order);
                          }}
                        >
                          <IonIcon slot="icon-only" icon={checkmark}></IonIcon>
                        </IonItemOption>
                      )}
                      <IonItemOption
                        color="success"
                        expandable={true}
                        onClick={async () => {
                          await handleChangeStatus("collected", order);
                        }}
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={checkmarkDoneOutline}
                        ></IonIcon>
                      </IonItemOption>
                      <IonItemOption color="danger" expandable={true}>
                        <IonIcon
                          slot="icon-only"
                          icon={banOutline}
                          onClick={async () => {
                            await handleChangeStatus("cancelled", order);
                          }}
                        ></IonIcon>
                      </IonItemOption>
                    </IonItemOptions>
                  )}
                </IonItemSliding>
              ))}
            </IonList>
            <OrderDetailsModal
              dismiss={dismiss}
              selectedOrder={selectedOrder}
              isOpen={isOpen}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
}
