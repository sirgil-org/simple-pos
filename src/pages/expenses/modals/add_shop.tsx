import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
} from "@ionic/react";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { supabase } from "../../../supabase_client";

export default function AddShopModal({ dismiss, isOpen }: any) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ name }: any) => {
    setLoading(true);
    const { error } = await supabase.from("shops").insert({ name });
    setLoading(false);

    if (error) {
      return toast.error(error.message || "Could not add shop");
    }

    reset();
    dismiss();
  };
  return (
    <IonModal
      isOpen={isOpen}
      presentingElement={document.getElementById("main-content")!}
      onWillDismiss={dismiss}
    >
      <IonHeader>
        <IonToolbar>
          {/* <IonTitle>Modal</IonTitle> */}
          <IonButtons slot="end">
            <IonButton onClick={() => dismiss()}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form id="change-status-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium"
            >
              Shop name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              className="border border-gray-300 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
