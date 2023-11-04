import { useState, useEffect, useMemo } from "react";
import { supabase } from "../../supabase_client";
import { toast } from "react-toastify";
import addNotification from 'react-push-notification';

import { Modal, Label, Radio, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import ListSkeletal from "../../components/list_skeletal_loader";
import OrderTable from "./components/order_table";
import moment from "moment";
import OrderInfo from "./order_info";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [orders, setOrders]: any = useState([]);
  const [selectedOrder, setSelectedOrder]: any = useState("");
  const [openModal, setOpenModal] = useState(undefined);

  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ status }: any) => {
    let to_update: any = { status };

    switch (status) {
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

    setUpdateLoading(true);
    const { error } = await supabase
      .from("orders")
      .update(to_update)
      .eq("id", selectedOrder.id)
      .order("created", { ascending: false });

    const index = orders.findIndex(
      (order: any) => order.id === selectedOrder.id
    );

    const tmpOrders = orders;

    tmpOrders[index] = { ...selectedOrder, status };
    setOrders(tmpOrders);
    setUpdateLoading(false);

    if (error) {
      return alert(error);
    }

    setOpenModal(undefined);
  };

  useEffect(() => {
    async function getOrders() {
      setLoading(true);

      const { data, error } = await supabase.from("orders").select();

      if (error) {
        toast.warn(error.message || "Could not fetch orders...")
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
            title: 'Notice',
            subtitle: 'You\ve received an order...',
            theme: 'darkblue',
            native: true // when using native, your OS will handle theming.
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
            />
            <OrderTable
              orders={orders.filter(
                (order: any) => order.status === "preparing"
              )}
              setSelectedOrder={setSelectedOrder}
              setOpenModal={setOpenModal}
              status="Preparing"
            />

            <OrderTable
              orders={orders.filter((order: any) => order.status === "ready")}
              setSelectedOrder={setSelectedOrder}
              setOpenModal={setOpenModal}
              status="Ready"
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

      <Modal
        dismissible
        show={openModal === "order-status-modal"}
        onClose={() => setOpenModal(undefined)}
        size="md"
      >
        <Modal.Header>#{selectedOrder.order_number}</Modal.Header>
        <Modal.Body>
          <form id="change-status-form" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="flex max-w-md flex-col gap-4">
              <legend className="mb-4">Choose the status of this order</legend>
              <div className="flex items-center gap-2">
                <Radio
                  {...register("status")}
                  id="waiting"
                  value="waiting"
                  defaultChecked
                />
                <Label htmlFor="waiting">Waiting</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  {...register("status")}
                  id="preparing"
                  value="preparing"
                />
                <Label htmlFor="preparing">Preparing</Label>
              </div>
              <div {...register("status")} className="flex items-center gap-2">
                <Radio {...register("status")} id="ready" value="ready" />
                <Label htmlFor="ready">Ready</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  {...register("status")}
                  id="collected"
                  value="collected"
                />
                <Label htmlFor="collected">Collected</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="cancelled" value="cancelled" />
                <Label htmlFor="cancelled">Cancelled</Label>
              </div>
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            form="change-status-form"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {updateLoading ? <Spinner /> : "Save"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
