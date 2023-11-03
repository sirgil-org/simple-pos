import { useState, useEffect } from "react";
import { supabase } from "../supabase_client";

import { Table, Modal, Label, Radio, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import ListSkeletal from "../components/list_skeletal_loader";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [orders, setOrders]: any = useState([]);
  const [selectedOrder, setSelectedOrder]:any = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ status }: any) => {
    setUpdateLoading(true);
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", selectedOrder.id);

    setUpdateLoading(false);
    if (error) {
      return alert(error);
    }

    setOpenModal(false);
  };

  useEffect(() => {
    async function getProfile() {
      setLoading(true);

      const { data, error } = await supabase.from("orders").select();

      if (error) {
        console.warn(error);
      } else if (data) {
        setOrders(data);
      }

      setLoading(false);
    }

    getProfile();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <ListSkeletal />
      ) : (
        <Table striped hoverable className="table-auto">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Browse Orders
          </caption>
          <Table.Head>
            <Table.HeadCell>Order number</Table.HeadCell>
            <Table.HeadCell>Phone number</Table.HeadCell>
            <Table.HeadCell>Items</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Created</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders.map((order:any) => (
              <Table.Row
                key={order.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{order.order_number}</Table.Cell>
                <Table.Cell>{order.phone_number}</Table.Cell>
                <Table.Cell>{order.order_number}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>{order.created_at}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setOpenModal(true);
                    }}
                  >
                    Edit
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
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
