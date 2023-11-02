import { useState, useEffect } from "react";
import { supabase } from "../supabase_client";

import { Table, Modal, Button, Label, Radio } from "flowbite-react";
import { useForm } from "react-hook-form";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ status }) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", selectedOrder.id);

    if (error) {
      alert(error);
    }
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
      <h2>Orders</h2>
      <Table striped className="table-auto">
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
          {orders.map((order) => (
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
                    setSelectedOrder(order)
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

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>#{selectedOrder.order_number}</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                <Radio id="cancelled" value="cancelled" />
                <Label htmlFor="cancelled">Cancelled</Label>
              </div>
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
