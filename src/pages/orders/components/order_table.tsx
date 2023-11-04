import { Spinner, Table } from "flowbite-react";
import moment from "moment";
import { useState } from "react";

import { LuArrowRightToLine } from "react-icons/lu";

export default function OrderTable({
  orders,
  setSelectedOrder,
  setOpenModal,
  status,
  handleChangeStatus,
}: any) {
  const possibleStatus = ["waiting", "preparing", "ready", "collected"];
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-h-[500px] overflow-y-auto">
      <Table striped hoverable className="table-auto">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          {status} Orders ({orders.length})
        </caption>
        <Table.Head>
          <Table.HeadCell>Order number</Table.HeadCell>
          <Table.HeadCell>Items</Table.HeadCell>
          <Table.HeadCell>Created</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {orders.map((order: any) => (
            <Table.Row
              key={order.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
              onClick={() => {
                setSelectedOrder(order);
                setOpenModal("order-info-modal");
              }}
            >
              <Table.Cell>{order.order_number}</Table.Cell>
              <Table.Cell>{order.order_number}</Table.Cell>
              <Table.Cell>{moment(order.created_at).fromNow()}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrder(order);
                      setOpenModal("order-status-modal");
                    }}
                  >
                    Edit
                  </button>

                  {!["cancelled", "collected"].includes(
                    status.toLowerCase()
                  ) && (
                    <div
                      onClick={async (e) => {
                        e.stopPropagation();
                        setLoading(true)
                        await handleChangeStatus(
                          possibleStatus[
                            possibleStatus.indexOf(status.toLowerCase()) + 1
                          ],
                          order
                        );
                        setLoading(false)
                      }}
                    >
                      {loading ? <Spinner /> : <LuArrowRightToLine /> }
                    </div>
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
