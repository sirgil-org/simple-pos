import { Spinner, Table } from "flowbite-react";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddPurchaseModal, AddShopModal } from "./components";

const data = [
  {
    invoice: 4,
    shop: "Metro",
    amount: 50,
  },
  {
    invoice: 6,
    shop: "Shoprite",
    amount: 25,
  },
  {
    invoice: 7,
    shop: "Metro",
    amount: 50,
  },
];

export default function Expenses() {
  const [openModal, setOpenModal]: any = useState(undefined);

  return (
    <div>
      <div className="flex items-center justify-end pb-4">
        <div>
          <button
            onClick={() => {
              setOpenModal("add-shop-modal");
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Shop
          </button>
          <button
            onClick={() => {
              setOpenModal("add-purchase-modal");
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Purchase
          </button>
        </div>
      </div>
      <Table striped hoverable className="table-auto">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Browse list of expenses
        </caption>
        <Table.Head>
          <Table.HeadCell>Invoice</Table.HeadCell>

          <Table.HeadCell>Shop</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Created</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((order: any) => (
            <Table.Row
              key={order.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
            >
              <Table.Cell>#{order.invoice}</Table.Cell>
              <Table.Cell>
                <div className="truncate overflow-ellipsis overflow-hidden max-w-[150px]">
                  {order.shop}
                </div>
              </Table.Cell>

              <Table.Cell>{order.amount}</Table.Cell>
              <Table.Cell>{moment(order.created_at).fromNow()}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center space-x-3">Edit</div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <AddPurchaseModal openModal={openModal} setOpenModal={setOpenModal} />
      <AddShopModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
