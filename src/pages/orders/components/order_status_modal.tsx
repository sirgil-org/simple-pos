import { Modal, Label, Radio, Spinner } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function OrderStatusModal({
  openModal,
  setOpenModal,
  selectedOrder,
  handleChangeStatus,
}: any) {
  const { register, handleSubmit } = useForm();
  const [updateLoading, setUpdateLoading] = useState(false);

  const onSubmit = async ({ status }: any) => {
    setUpdateLoading(true);
    await handleChangeStatus(status, selectedOrder);
    setUpdateLoading(false);

    setOpenModal(undefined);
  };
  return (
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
                defaultChecked={selectedOrder.status === "waiting"}
              />
              <Label htmlFor="waiting">Waiting</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                {...register("status")}
                id="preparing"
                value="preparing"
                defaultChecked={selectedOrder.status === "preparing"}
              />
              <Label htmlFor="preparing">Preparing</Label>
            </div>
            <div {...register("status")} className="flex items-center gap-2">
              <Radio
                {...register("status")}
                id="ready"
                value="ready"
                defaultChecked={selectedOrder.status === "ready"}
              />
              <Label htmlFor="ready">Ready</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                {...register("status")}
                id="collected"
                value="collected"
                defaultChecked={selectedOrder.status === "collected"}
              />
              <Label htmlFor="collected">Collected</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                {...register("status")}
                id="cancelled"
                value="cancelled"
                defaultChecked={selectedOrder.status === "cancelled"}
              />
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
  );
}
