import {
  IonModal,
  IonContent,
  IonInput,
  IonButton,
  IonImg,
  IonIcon,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { IAddItemForm } from "../../types";
import { useCurrentUser } from "../../contexts";
import { camera, trash } from "ionicons/icons";
import { useState } from "react";

function FormModal({
  products,
  setProducts,
  getPhoto,
  removePhoto,
  getLoadedPhoto,
  photos,
}) {
  const { currentUser } = useCurrentUser();
  const [imagePath, setImagePath] = useState("");
  const { register, handleSubmit, reset } = useForm<IAddItemForm>({
    // defaultValues: { title: "", price: null },
  });

  const onSubmit = (formData) => {
    setProducts([
      ...products,
      {
        ...formData,
        slug: formData.title.replace(/\s+/g, "-").toLowerCase(),
        vendor_id: currentUser.id,
        image_path: imagePath,
        image_url: `https://dkbiusybhvgudspqbhxy.supabase.co/storage/v1/object/public/product-images/${currentUser.id}/${imagePath}`,
      },
    ]);

    setImagePath("");
    reset({ title: "", price: null });
  };

  async function canDismiss(_: unknown, role?: string) {
    return role !== "gesture";
  }
  return (
    <IonModal
      isOpen={products.length < 2}
      initialBreakpoint={0.5}
      breakpoints={[0, 0.5, 0.75]}
      backdropDismiss={false}
      backdropBreakpoint={0.75}
      canDismiss={canDismiss}
    >
      <IonContent className="ion-padding">
        <div className="flex justify-center mb-10">
          {photos.length && imagePath ? (
            <div className="h-[120px] w-[120px] relative">
              <div className="h-full w-full rounded-lg overflow-hidden">
                <IonImg
                  src={getLoadedPhoto(imagePath).webviewPath}
                  key={getLoadedPhoto(imagePath).filepath}
                  className="object-cover w-full h-full"
                />
              </div>
              <div
                onClick={() => removePhoto(imagePath)}
                className="flex items-center justify-center rounded-full border-2 border-white bg-blue-500 p-2 absolute bottom-[-10px] right-[-10px]"
              >
                <IonIcon icon={trash} className="text-white" />
              </div>
            </div>
          ) : (
            <div
              className="bg-blue-500 p-8 h-[120px] w-[120px] rounded-full"
              onClick={async () => {
                const path = await getPhoto();
                setImagePath(path);
              }}
            >
              <IonIcon icon={camera} className="h-full w-full text-white" />
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <IonInput
              id="title-input"
              label="Title"
              labelPlacement="stacked"
              fill="outline"
              autoFocus
              placeholder="Enter product title"
              autoCapitalize="words"
              type="text"
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
