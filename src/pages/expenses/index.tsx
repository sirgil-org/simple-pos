import { Spinner, Table } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AddPurchaseModal, AddShopModal } from "./components";
import { toast } from "react-toastify";
import { supabase } from "../../supabase_client";

export default function Expenses() {
  const [openModal, setOpenModal]: any = useState(undefined);
  const [expenses, setExpenses]: any = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getOrders() {
      setLoading(true);

      const { data, error } = await supabase.from("expenses").select(`
        id,
        invoice_number,
        amount,
        created_at,
        shops ( 
          name
        )
      `);

      if (error) {
        toast.warn(error.message || "Could not fetch expenses...");
      } else if (data) {
        setExpenses(data);
      }

      setLoading(false);
    }

    getOrders();
  }, []);

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
          <Table.HeadCell>Amount (N$)</Table.HeadCell>
          <Table.HeadCell>Created</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {expenses.map((expense: any) => (
            <Table.Row
              key={expense.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
            >
              <Table.Cell>#{expense.invoice_number}</Table.Cell>
              <Table.Cell>
                <div className="truncate overflow-ellipsis overflow-hidden max-w-[150px]">
                  {expense.shops.name}
                </div>
              </Table.Cell>

              <Table.Cell>{expense.amount}</Table.Cell>
              <Table.Cell>{moment(expense.created_at).format('Do MMMM YYYY, h:mm a')}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <AddPurchaseModal openModal={openModal} setOpenModal={setOpenModal} />
      <AddShopModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
