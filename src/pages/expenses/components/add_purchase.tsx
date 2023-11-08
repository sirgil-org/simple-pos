import { Modal, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../../supabase_client";
import { toast } from "react-toastify";

export default function AddPurchaseModal({ openModal, setOpenModal }: any) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const [loadingShops, setLoadingShops] = useState(true);
  const [shops, setShops] = useState([]);

  const onSubmit = async ({ invoice_number, shop, amount }: any) => {
    setLoading(true);
    const { error } = await supabase
      .from("expenses")
      .insert({ invoice_number, shop_id: shop, amount });
    setLoading(false);

    if (error) {
      return toast.error(error.message || "Could not add shop");
    }

    reset();
    setOpenModal(undefined);
  };

  const fetchData = async () => {
    setLoadingShops(true);

    const { data, error } = await supabase.from("shops").select();

    if (error) {
      toast.warn(error.message || "Could not fetch shops...");
    } else if (data) {
      setShops(data);
    }

    setLoadingShops(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loadingShops) {
    return <></>;
  }
  return (
    <Modal
      dismissible
      show={openModal === "add-purchase-modal"}
      onClose={() => setOpenModal(undefined)}
      size="md"
    >
      <Modal.Header>Add Purchase</Modal.Header>
      <Modal.Body>
        <form id="change-status-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="invoice_number"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Invoice number
            </label>
            <input
              {...register("invoice_number", { required: true })}
              type="text"
              id="invoice_number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="shops"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Shops
            </label>
            <select
              id="shops"
              {...register("shop", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a shop</option>
              {shops.map((shop: any) => (
                <option value={shop.id}>{shop.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Amount
            </label>
            <input
              {...register("amount", { required: true })}
              type="number"
              id="amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div>
            <button
              form="change-status-form"
              className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {loading ? <Spinner /> : "Save"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
