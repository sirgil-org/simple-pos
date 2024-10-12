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
} from "@ionic/react";
import FormModal from "./form_modal";

export default function ShopSetupPage({showSetup, setShowSetup}) {
  const { getPhoto, photos } = usePhotoGallery();
  const { loading, insert } = useMutation();
  const [products, setProducts] = useState([]);
  const [present] = useIonToast();

  const presentToast = (
    position: "top" | "middle" | "bottom",
    message: string,
    type: "success" | "warning"
  ) => {
    present({
      message,
      duration: 1500,
      position: position,
      color: type,
    });
  };

  const uploadImage = async (photo) => {
    console.log("uploading");
    const base64Data = await base64FromPath(photo.webPath!);
    console.log("prep....", base64Data);
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

  async function base64FromPath(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("method did not return a string");
        }
      };
      reader.readAsDataURL(blob);
    });
  }

  const handleSave = async () => {
    //   console.log("in save,...", photos.length);
    //   await Promise.all(
    //     photos.map(async (photo) => {
    //       await uploadImage(photo);
    //     })
    //   );
    const { error } = await insert("products", products);

    if (error) {
      presentToast("top", error.message, "warning");
    } else {
      presentToast("top", "Item added!", "success");
      setShowSetup(false);
    }
  };

  return (
    <IonModal canDismiss={false} isOpen={showSetup}>
      <div style={{ paddingTop: "env(safe-area-inset-top)" }}></div>
      <IonContent>
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
                />
              </IonThumbnail>
              <IonLabel>{product.title}</IonLabel>
              <IonNote>N$ 30.00</IonNote>
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
