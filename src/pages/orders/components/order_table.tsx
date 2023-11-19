import { Spinner } from "flowbite-react";
import { formatDistance } from "date-fns";

import { useState } from "react";

import { LuArrowRightToLine } from "react-icons/lu";
import { SlArrowRight, SlNote } from "react-icons/sl";

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

      {!orders.length ? (
        <div className="h-36 grid place-items-center">
          <span>No orders</span>
        </div>
      ) : (
        <div className="my-2">
          <div className="hidden sm:block px-3">
            <table className="table table-auto w-full">
              <thead className="">
                <tr>
                  <th>Order number</th>
                  <th>Items</th>
                  <th>Created</th>
                  <th>
                    <span className="sr-only"></span>
                  </th>
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
                    <td>
                      {formatDistance(new Date(order.created_at), new Date(), {
                        addSuffix: true,
                      })}
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <button
                          className=""
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
                                  possibleStatus.indexOf(status.toLowerCase()) +
                                    1
                                ],
                                order
                              );
                              setLoading([]);
                            }}
                          >
                            {loading.includes(order.order_number) ? (
                              <Spinner />
                            ) : (
                              <button className="">
                                <LuArrowRightToLine />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {orders?.map((order: any) => (
            <div
              key={order.id}
              className="flex items-center justify-between gap-2 sm:hidden px-2 py-1.5 border-b-2"
            >
              <div className="w-16">
                <div className="mask mask-squircle w-12 h-12 bg-base-100 grid place-items-center">
                  <span className="text-xl font-extrabold">
                    {order.order_number}
                  </span>
                </div>
              </div>

              <div className="text-base flex-auto">
                {order.product_order.map(
                  (item: any) =>
                    item.quantity + "x" + item.products.title + ", "
                )}
              </div>

              <div className="flex items-center gap-2">
                <button className="p-3 bg-base-100 rounded-md ">
                  <SlNote />
                </button>

                <button className="p-3 bg-base-100 rounded-md">
                  <SlArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
