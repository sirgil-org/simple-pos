import { Modal, Table } from "flowbite-react";
import moment from "moment";

export default function OrderInfo({
  selectedOrder,
  openModal,
  setOpenModal,
}: any) {
  return (
    <Modal
      dismissible
      show={openModal === "order-info-modal"}
      onClose={() => setOpenModal(undefined)}
      size="md"
    >
      <Modal.Header>#{selectedOrder.order_number}</Modal.Header>
      <Modal.Body>
        <div className="flex justify-between">
          <div>Created</div>
          <div> {moment(selectedOrder.created_at).fromNow()}</div>
        </div>
        {selectedOrder.items.order.map((order: any) => (
          <div className="flex justify-between">
            <div>
              {order.quantity} x {order.product_retailer_id}
            </div>
            <div>N$ {order.quantity * order.item_price}</div>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
}
