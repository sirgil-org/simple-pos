import { usePhotoGallery } from "../../hooks/usePhotoGallery";
import useMutation from "../../hooks/mutation";
import { useState } from "react";

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
import { uploadImage } from "../../utils";
import { useCurrentUser } from "../../contexts";

type IShopSetup = {
  showSetup: boolean;
  setShowSetup: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
};

export default function ShopSetupPage({ showSetup, setShowSetup }: IShopSetup) {
  const { getPhoto, getLoadedPhoto, removePhoto, photos } = usePhotoGallery();
  const { currentUser } = useCurrentUser();
  const { loading, insert } = useMutation();
  const [loadingUpload, setLoadingUploading] = useState(false);
  const [products, setProducts] = useState([]);
  const [present] = useIonToast();

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
    // console.log("in save,...", photos.length);
    setLoadingUploading(true);
    await Promise.all(
      photos.map(async (photo) => {
        // TODO: Should check for any issues on file upload
        await uploadImage(currentUser.id, photo);
      })
    );
    setLoadingUploading(false);

    const _products = products.map((product) => {
      return {
        title: product.title,
        price: product.price,
        image_url: product.image_url,
        vendor_id: currentUser.id,
      };
    });
    const { error } = await insert("products", _products);

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

  async function canDismiss(_, role?: string) {
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
                  src={getLoadedPhoto(product.image_path).webviewPath}
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
            {loading || loadingUpload ? (
              <IonSpinner name="crescent" />
            ) : (
              "Submit"
            )}
          </IonButton>
        </IonToolbar>
      </IonFooter>
      <FormModal
        products={products}
        setProducts={setProducts}
        getPhoto={getPhoto}
        removePhoto={removePhoto}
        getLoadedPhoto={getLoadedPhoto}
        photos={photos}
      />
    </IonModal>
  );
}
