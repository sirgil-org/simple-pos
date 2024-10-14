import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonInput,
  IonSpinner,
  useIonToast,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { IAddItemForm } from "../../types";
import { useCurrentUser } from "../../contexts";
import useMutation from "../../hooks/mutation";
import { useEffect } from "react";

function ManageInventoryModal({
  isOpen,
  setIsOpen,
  selectedProduct,
  setSelectedProduct,
  refresh,
}) {
  const { currentUser } = useCurrentUser();
  const [present] = useIonToast();
  const { loading: loadingInsert, insert, update } = useMutation();
  const { register, handleSubmit, reset, setValue } = useForm<IAddItemForm>({});

  const onSubmit = async (formData) => {
    if (selectedProduct) {
      const { error } = await update("products", selectedProduct.id, {
        ...formData,
        image_url: "https://docs-demo.ionic.io/assets/madison.jpg",
      });
      if (error) {
        present({
          message: error.message,
          color: "warning",
          duration: 1500,
          position: "top",
        });
      } else {
        present({
          message: "Item updated!",
          color: "medium",
          duration: 1500,
          position: "top",
        });
        setIsOpen(false);
        reset();
        setSelectedProduct(null);
        refresh();
      }
    } else {
      const { error } = await insert("products", {
        ...formData,
        vendor_id: currentUser.id,
        image_url: "https://docs-demo.ionic.io/assets/madison.jpg",
      });
      if (error) {
        present({
          message: error.message,
          color: "warning",
          duration: 1500,
          position: "top",
        });
      } else {
        present({
          message: "Item added!",
          color: "medium",
          duration: 1500,
          position: "top",
        });
        setIsOpen(false);
        reset();
        refresh();
      }
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      console.log(selectedProduct);
      setValue("price", selectedProduct.price);
      setValue("title", selectedProduct.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct]);

  return (
    <IonModal
      isOpen={isOpen}
      presentingElement={document.getElementById("manage-inventory")!}
      canDismiss
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setIsOpen(false);
                setSelectedProduct(null);
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <IonInput
              id="title"
              label="Title"
              labelPlacement="stacked"
              fill="outline"
              autoFocus
              placeholder="Enter product title"
              autoCapitalize="on"
              autofocus
              maxlength={30}
              {...register("title", { required: true })}
            />
            <IonInput
              id="price"
              label="Price (N$)"
              labelPlacement="stacked"
              type="text"
              fill="outline"
              inputMode="decimal"
              autoFocus
              placeholder="0.00"
              {...register("price", { required: true })}
            />
          </div>
          <IonButton
            type="submit"
            expand="block"
            className="mt-6"
            disabled={loadingInsert}
          >
            {loadingInsert ? (
              <IonSpinner />
            ) : selectedProduct ? (
              "Update"
            ) : (
              "Add To List"
            )}
          </IonButton>
        </form>
      </IonContent>
    </IonModal>
  );
}

export default ManageInventoryModal;
