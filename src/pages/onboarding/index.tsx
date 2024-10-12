import { usePhotoGallery } from "../../hooks/usePhotoGallery";
import useMutation from "../../hooks/mutation";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts";
import { supabase } from "../../supabase_client";

import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonFooter,
  IonToolbar,
  IonListHeader,
  IonThumbnail,
  IonSpinner,
  useIonToast,
  useIonRouter,
} from "@ionic/react";
import { useForm } from "react-hook-form";

type IAddItem = {
  title: string;
  price: number;
};

export default function OnboardingPage() {
  const currentUser = useContext(AuthContext);
  const { getPhoto, photos } = usePhotoGallery();
  const { loading, insert } = useMutation();
  const [products, setProducts] = useState([]);
  const [present] = useIonToast();
  const router = useIonRouter();

  const presentToast = (
    position: "top" | "middle" | "bottom",
    message: string,
    type: "success" | "warning"
  ) => {
    present({
      message,
      duration: 1500,
      position: position,
      color: type
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAddItem>({ defaultValues: { title: "", price: 0 } });



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
      router.push('/tabs', 'root', 'replace');
    }
  };

  const onSubmit = (formData) => {
    setProducts([
      ...products,
      {
        ...formData,
        vendor_id: "c0f5bdec-668d-4eb5-9cc5-e06247f2fef2",
        image_url: "https://random",
      },
    ]);
    reset();
  };

  async function canDismiss(_: unknown, role?: string) {
    return role !== "gesture";
  }

  return (
    <AuthContext.Provider value={currentUser}>
      <IonPage>
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
      </IonPage>
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
    </AuthContext.Provider>
  );
}
