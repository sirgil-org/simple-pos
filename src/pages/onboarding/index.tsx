import { usePhotoGallery } from "../../hooks/usePhotoGallery";
import useMutation from "../../hooks/mutation";
import { useState } from "react";
import { supabase } from "../../supabase_client";

import {
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonFooter,
  IonToolbar,
  IonListHeader,
  IonThumbnail,
  IonSpinner,
  useIonToast,
  IonModal,
  useIonViewDidEnter,
} from "@ionic/react";
import FormModal from "./form.modal";
import { Keyboard, KeyboardResize } from "@capacitor/keyboard";
import { base64FromPath } from "../../utils";

type IShopSetup = {
  showSetup: boolean;
  setShowSetup: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
};

export default function ShopSetupPage({ showSetup, setShowSetup }: IShopSetup) {
  const { getPhoto, photo } = usePhotoGallery();
  const { loading, insert } = useMutation();
  const [products, setProducts] = useState([]);
  const [present] = useIonToast();

  const uploadImage = async (photo) => {
    const base64Data = await base64FromPath(photo.webPath!);
    const { data, error } = await supabase.storage
      .from(`product-images`)
      .upload(
        `c0f5bdec-668d-4eb5-9cc5-e06247f2fef2/${photo.filepath}`,
        base64Data,
        {
          contentType: "image/jpeg",
          cacheControl: "3600",
          upsert: true,
        }
      );

    if (error) {
      console.error(error);
    } else {
      console.log(data, " uploaded");
    }
  };

  useIonViewDidEnter(() => {
    Keyboard.setResizeMode({ mode: KeyboardResize.Native });

    setTimeout(() => {
      const emailInput = document.getElementById(
        "title-input"
      ) as HTMLIonInputElement;
      if (emailInput) {
        emailInput.setFocus();
      }
    }, 300);
  });

  const handleSave = async () => {
    //   console.log("in save,...", photos.length);
    //   await Promise.all(
    //     photos.map(async (photo) => {
    //       await uploadImage(photo);
    //     })
    //   );
    const { error } = await insert("products", products);

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
      setShowSetup(false);
    }
  };

  async function canDismiss(data?: any, role?: string) {
    return role !== "gesture";
  }

  return (
    <IonModal
      canDismiss={canDismiss}
      isOpen={showSetup}
      presentingElement={document.getElementById("main-content")!}
    >
      <div style={{ paddingTop: "env(safe-area-inset-top)" }}></div>
      <IonContent scroll-y="false">
        {/* <IonGrid>
                <IonRow>
                  {photos.length ? (
                    photos.map((photo) => (
                      <IonCol size="6" key={photo.filepath}>
                        <IonImg src={photo.webviewPath} />
                      </IonCol>
                    ))
                  ) : (
                    <div
                      onClick={() => getPhoto()}
                      className="flex items-center justify-center h-[200px] w-full border border-dashed rounded-md text-3xl font-bold"
                    >
                      Add a Photo
                    </div>
                  )}
                </IonRow>
              </IonGrid> */}
        <IonList>
          <IonListHeader className="mb-5">
            <IonLabel class="text-4xl font-thin">
              First, let's setup your shop. What do you sell?
            </IonLabel>
          </IonListHeader>
          {products.map((product, index: number) => (
            <IonItem key={index}>
              <IonThumbnail aria-hidden="true" slot="start">
                <img
                  alt=""
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  className="rounded-lg"
                />
              </IonThumbnail>
              <IonLabel>{product.title}</IonLabel>
              <IonNote>N$ {parseFloat(product.price).toFixed(2)}</IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            disabled={products.length < 2 || loading}
            expand="block"
            className="m-2"
            onClick={handleSave}
          >
            {loading ? <IonSpinner name="crescent" /> : "Submit"}
          </IonButton>
        </IonToolbar>
      </IonFooter>
      <FormModal products={products} setProducts={setProducts} />
    </IonModal>
  );
}
