import { IonModal, IonContent, IonInput, IonButton } from "@ionic/react";
import { useForm } from "react-hook-form";

type IAddItem = {
  title: string;
  price: number;
};

function FormModal({ products, setProducts }) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<IAddItem>({ defaultValues: { title: "", price: 0 } });

  const onSubmit = (formData) => {
    setProducts([
      ...products,
      {
        ...formData,
        vendor_id: "c0f5bdec-668d-4eb5-9cc5-e06247f2fef2",
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
              fill="outline"
              autoFocus
              placeholder="Enter product title"
              {...register("title", { required: true })}
            />
            <IonInput
              id="price"
              label="Price"
              type="number"
              fill="outline"
              inputMode="numeric"
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
