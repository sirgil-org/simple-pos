import { useState, useEffect, useMemo } from "react";
import { supabase } from "../../supabase_client";
import { toast } from "react-toastify";
import addNotification from "react-push-notification";

import ListSkeletal from "../../components/list_skeletal_loader";
import OrderTable from "./components/order_table";
import moment from "moment";
import OrderInfo from "./order_info";
import OrderStatusModal from "./components/order_status_modal";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders]: any = useState([]);
  const [selectedOrder, setSelectedOrder]: any = useState("");
  const [openModal, setOpenModal] = useState(undefined);

  const handleChangeStatus = async (status: string, currentOrder: any) => {
    const to_update: any = { status };

    switch (status) {
      case "preparing":
        to_update.preparing_at = moment();
        break;
      case "ready":
        to_update.completed_at = moment();
        break;

      case "collected":
        to_update.collected_at = moment();
        break;

      case "cancelled":
        to_update.cancelled_at = moment();
        break;
    }

    const { error } = await supabase
      .from("orders")
      .update(to_update)
      .eq("id", currentOrder.id);

   
    setOrders((prev: any) => {
      const index = prev.findIndex(
        (p: any) => p.id === currentOrder.id
      );


      prev[index] = {...prev[index], status};

      // Only way for the UI to update realtime, if just prev is returned
      // it won't work as expected. My assumption is that it's memory issue, 
      // probably assigning by memory location.
      return [...prev]
    });

    if (error) {
      toast.error(error.message || "Could not update");
    }
  };

  useEffect(() => {
    async function getOrders() {
      setLoading(true);

      const { data, error } = await supabase.from("orders").select(`
        id, 
        order_number, 
        status,
        created_at,
        phone_number,
        product_order ( 
          sku, 
          quantity, 
          created_at, 
          order_id, 
          price,
          products (
            title
          )
        )
      `);

      if (error) {
        toast.warn(error.message || "Could not fetch orders...");
      } else if (data) {
        setOrders(data);
      }

      setLoading(false);
    }

    getOrders();
  }, []);

  useMemo(() => {
    supabase
      .channel("todos")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (data) => {
          setOrders((prev: any) => [...prev, data.new]);
          toast.info("New order received!");
          addNotification({
            title: "Notice",
            subtitle: "You\ve received an order...",
            theme: "darkblue",
            native: true, // when using native, your OS will handle theming.
          });
        }
      )
      .subscribe();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <ListSkeletal />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-[50px]">
            <OrderTable
              orders={orders.filter((order: any) => order.status === "waiting")}
              setSelectedOrder={setSelectedOrder}
              setOpenModal={setOpenModal}
              status="Waiting"
              handleChangeStatus={handleChangeStatus}
            />
            <OrderTable
              orders={orders.filter(
                (order: any) => order.status === "preparing"
              )}
              setSelectedOrder={setSelectedOrder}
              setOpenModal={setOpenModal}
              status="Preparing"
              handleChangeStatus={handleChangeStatus}
            />

            <OrderTable
              orders={orders.filter((order: any) => order.status === "ready")}
              setSelectedOrder={setSelectedOrder}
              setOpenModal={setOpenModal}
              status="Ready"
              handleChangeStatus={handleChangeStatus}
            />

            <OrderTable
              orders={orders.filter(
                (order: any) => order.status === "collected"
              )}
              setSelectedOrder={setSelectedOrder}
              setOpenModal={setOpenModal}
              status="Collected"
            />

            <OrderTable
              orders={orders.filter(
                (order: any) => order.status === "cancelled"
              )}
              setSelectedOrder={setSelectedOrder}
              setOpenModal={setOpenModal}
              status="Cancelled"
            />
          </div>
        </>
      )}

      {selectedOrder && (
        <OrderInfo
          selectedOrder={selectedOrder}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}

      <OrderStatusModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedOrder={selectedOrder}
        handleChangeStatus={handleChangeStatus}
      />
    </div>
  );
}
