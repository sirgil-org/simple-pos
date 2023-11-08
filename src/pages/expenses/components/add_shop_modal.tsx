import { Modal, Label, Radio, Spinner } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../../supabase_client";
import { toast } from "react-toastify";

export default function AddShopModal({ openModal, setOpenModal }: any) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ name }: any) => {
    setLoading(true);
    const { error } = await supabase.from("shops").insert({ name });
    setLoading(false)

    if(error){
      return toast.error(error.message || "Could not add shop")
    }

    reset()
    setOpenModal(undefined);
  };
  return (
    <Modal
      dismissible
      show={openModal === "add-shop-modal"}
      onClose={() => setOpenModal(undefined)}
      size="md"
    >
      <Modal.Header>Add Shop</Modal.Header>
      <Modal.Body>
        <form id="change-status-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Shop name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
