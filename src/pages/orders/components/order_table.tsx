import { Table } from "flowbite-react";

export default function OrderTable({
  orders,
  setSelectedOrder,
  setOpenModal,
  status,
}: any) {
  return (
    <div className="max-h-[500px] overflow-y-auto">
      <Table striped hoverable className="table-auto">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          {status} Orders ({orders.length})
        </caption>
        <Table.Head>
          <Table.HeadCell>Order number</Table.HeadCell>
          <Table.HeadCell>Items</Table.HeadCell>
          <Table.HeadCell>Duration</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {orders.map((order: any) => (
            <Table.Row
              key={order.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{order.order_number}</Table.Cell>
              <Table.Cell>{order.order_number}</Table.Cell>
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
    </div>
  );
}
