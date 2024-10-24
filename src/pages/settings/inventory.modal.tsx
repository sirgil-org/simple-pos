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
  IonIcon,
  IonImg,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { IAddItemForm } from "../../types";
import { useCurrentUser } from "../../contexts";
import useMutation from "../../hooks/mutation";
import { useEffect, useState } from "react";

import { imageOutline, trash } from "ionicons/icons";
import { usePhotoGallery } from "../../hooks/usePhotoGallery";
import { base64FromPath } from "../../utils";
import { supabase } from "../../supabase_client";
import { decode } from "base64-arraybuffer";

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
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<IAddItemForm>({});
  const { getPhoto, photos, clearPhotos } = usePhotoGallery();

  const onSubmit = async (formData) => {
    setLoading(true);
    const base64Data = await base64FromPath(photos[0].webviewPath!);
    const { data, error } = await supabase.storage
      .from(`product-images`)
      .upload(
        `${currentUser.id}/${photos[0].filepath}`,
        decode(base64Data.split(",")[1]),
        {
          contentType: "image/jpeg",
          cacheControl: "3600",
          upsert: false,
        }
      );

    if (error) {
      setLoading(false);
      return;
    }

    clearPhotos();
    setLoading(false);

    if (selectedProduct) {
      const { error } = await update("products", selectedProduct.id, {
        ...formData,
        slug: formData.title.replace(/\s+/g, "-").toLowerCase(),
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
        refresh();
      }
    } else {
      const { error } = await insert("products", {
        ...formData,
        slug: formData.title.replace(/\s+/g, "-").toLowerCase(),
        vendor_id: currentUser.id,
        image_url: `https://dkbiusybhvgudspqbhxy.supabase.co/storage/v1/object/public/${data.fullPath}`,
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
  }, [selectedProduct, photos]);

  return (
    <IonModal
      isOpen={isOpen}
      presentingElement={document.getElementById("manage-inventory")!}
      canDismiss
      onDidDismiss={() => {
        setSelectedProduct(null);
        setIsOpen(false);
        clearPhotos();
        reset();
      }}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex justify-center mb-10">
          {photos.length ? (
            <div className="h-[200px] relative">
              <div className="h-full w-full rounded-lg overflow-hidden">
                <IonImg
                  src={photos[0].webviewPath}
                  key={photos[0].filepath}
                  className="object-cover w-full h-full"
                />
              </div>
              <div
                onClick={clearPhotos}
                className="flex items-center justify-center rounded-full bg-blue-500 p-2 absolute bottom-[-10px] right-[-10px]"
              >
                <IonIcon icon={trash} className="text-white" />
              </div>
            </div>
          ) : (
            <div
              className="border-2 border-gray-400 border-dashed p-12 px-36 h-[200px] w-full rounded-lg"
              onClick={() => getPhoto()}
            >
              <IonIcon
                icon={imageOutline}
                className="h-full w-full text-gray-500"
              />
            </div>
          )}
        </div>
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
            {loadingInsert || loading ? (
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
