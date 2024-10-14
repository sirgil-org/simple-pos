import { IonModal, IonContent, IonInput, IonButton } from "@ionic/react";
import { useForm } from "react-hook-form";
import { IAddItemForm } from "../../types";
import { useCurrentUser } from "../../contexts";

function FormModal({ products, setProducts }) {
  const { currentUser } = useCurrentUser();
  const { register, handleSubmit, reset } = useForm<IAddItemForm>({
    // defaultValues: { title: "", price: null },
  });

  const onSubmit = (formData) => {
    setProducts([
      ...products,
      {
        ...formData,
        vendor_id: currentUser.id,
        image_url: "https://docs-demo.ionic.io/assets/madison.jpg",
      },
    ]);
    reset();
  };

  async function canDismiss(_: unknown, role?: string) {
    return role !== "gesture";
  }
  return (
    <IonModal
      isOpen={products.length < 2}
      initialBreakpoint={0.25}
      breakpoints={[0, 0.25, 0.5]}
      backdropDismiss={false}
      backdropBreakpoint={0.5}
      canDismiss={canDismiss}
    >
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
          <IonButton type="submit" expand="block" className="mt-6">
            Add To List
          </IonButton>
        </form>
      </IonContent>
    </IonModal>
  );
}

export default FormModal;
