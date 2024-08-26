import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
} from "@ionic/react";
import { Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { supabase } from "../../../supabase_client";

export default function AddExpenseModal({ dismiss, isOpen }: any) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const [, setLoadingShops] = useState(true);
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
    dismiss();
  };

  const fetchData = async () => {
    setLoadingShops(true);

    const { data, error } = await supabase.from("shops").select();

    if (error) {
      toast.warn(error.message || "Could not fetch shops...");
    } else if (data.length) {
      setShops(data);
    }

    setLoadingShops(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <IonModal
      isOpen={isOpen}
      presentingElement={document.getElementById("main-content")!}
      onWillDismiss={dismiss}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => dismiss()}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form id="change-status-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="invoice_number"
              className="block mb-2 text-sm font-medium"
            >
              Invoice number
            </label>
            <input
              {...register("invoice_number", { required: true })}
              type="text"
              id="invoice_number"
              className="input input-lg w-full border border-gray-300"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="shops"
              className="block mb-2 text-sm font-medium"
            >
              Shops
            </label>
            <select
              id="shops"
              {...register("shop", { required: true })}
              className="input input-lg w-full border border-gray-300"
            >
              <option selected>Choose a shop</option>
              {shops.map((shop: any) => (
                <option key={shop.id} value={shop.id}>{shop.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium"
            >
              Amount
            </label>
            <input
              {...register("amount", { required: true })}
              type="number"
              inputMode="numeric"
              id="amount"
              className="input input-lg w-full border border-gray-300"
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
      </IonContent>
    </IonModal>
  );
}
