import { Spinner, Table } from "flowbite-react";
import moment from "moment";
import { useState } from "react";

import { LuArrowRightToLine } from "react-icons/lu";
import { SlNote } from "react-icons/sl";

export default function OrderTable({
  orders,
  setSelectedOrder,
  setOpenModal,
  status,
  handleChangeStatus,
}: any) {
  const possibleStatus = ["waiting", "preparing", "ready", "collected"];
  const [loading, setLoading]: any = useState([]);

  return (
    <div className="max-h-full overflow-y-auto rounded-lg bg-base-200 mb-4">
      <div className="p-5 text-lg font-semibold text-left capitalize w-full">
        {status} Orders ({orders.length})
      </div>

      {!orders.length ?
        <div className="h-36 grid place-items-center">
          <span>No orders</span>
        </div>
        :
        <table className="table table-auto">
          <thead className="">
            <tr>
              <th>Order number</th>
              <th>Items</th>
              <th>Created</th>
              <th><span className="sr-only"></span></th>
            </tr>
          </thead>
          <tbody className="">
            {orders?.map((order: any) => (
              <tr
                key={order.id}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedOrder(order);
                  setOpenModal("order-info-modal");
                }}
              >
                <td>{order.order_number}</td>
                <td>
                  <div className="truncate overflow-ellipsis overflow-hidden max-w-[150px]">
                    {order.product_order.map(
                      (item: any) =>
                        item.quantity + "x" + item.products.title + ", "
                    )}
                  </div>
                </td>
                <td>{moment(order.created_at).fromNow()}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                        setOpenModal("order-status-modal");
                      }}
                    >
                      <SlNote />
                    </button>

                    {!["cancelled", "collected"].includes(
                      status.toLowerCase()
                    ) && (
                        <div
                          onClick={async (e) => {
                            e.stopPropagation();
                            setLoading((prev: any) => [
                              ...prev,
                              order.order_number,
                            ]);
                            await handleChangeStatus(
                              possibleStatus[
                              possibleStatus.indexOf(status.toLowerCase()) + 1
                              ],
                              order
                            );
                            setLoading([]);
                          }}
                        >
                          {loading.includes(order.order_number) ? (
                            <Spinner />
                          ) : (
                            <LuArrowRightToLine />
                          )}
                        </div>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}
