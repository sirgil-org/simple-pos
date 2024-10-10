// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
} from "@ionic/react";
import { usePhotoGallery } from "../../hooks/usePhotoGallery";
import { add } from "ionicons/icons";
import useMutation from "../../hooks/mutation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts";
import { supabase } from "../../supabase_client";
import { decode } from "base64-arraybuffer";

export default function OnboardingPage() {
  const currentUser = useContext(AuthContext);
  const { getPhoto, photos } = usePhotoGallery();
  const { loading, insert } = useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const uploadImage = async (photo) => {
    const { data, error } = await supabase.storage
      .from(`product-images`)
      .upload(
        `c0f5bdec-668d-4eb5-9cc5-e06247f2fef2/${photo.filepath}`,
        decode(photo.webviewPath.split(",")[1]),
        {
          contentType: "image/jpeg",
          cacheControl: "3600",
          upsert: false,
        }
      );

    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  };

  const [products, setProducts] = useState([]);

  const handleSave = async () => {
    await Promise.all(
      photos.map(async (photo) => {
        await uploadImage(photo);
      })
    );

    // const { error } = await insert("products", products);

    // if (error) {
    //   toast.error(error.message);
    // } else {
    //   toast.success("Item added");
    // }
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

  return (
    <IonPage>
      <div style={{ paddingTop: "env(safe-area-inset-top)" }}></div>
      <IonContent className="ion-padding">
        <IonList>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="h-full text-start flex flex-col justify-between">
                <div>
                  <div className="font-bold text-4xl mb-3 mt-20">
                    Simple Pos
                  </div>
                  <div className="font-semibold text-3xl">
                    First we'll need a few things from you to setup your profile
                  </div>
                </div>
                <IonButton>Let's go</IonButton>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="h-full">
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                  <IonFabButton>
                    <IonIcon icon={add}></IonIcon>
                  </IonFabButton>
                </IonFab>
                <div>First let's setup your inventory. What do you sell?</div>
                <div>
                  <IonGrid>
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
                  </IonGrid>
                </div>
                <div>
                  <IonList>
                    {products.map((product, index: number) => (
                      <IonItem key={index}>
                        <IonLabel>{product.title}</IonLabel>
                        <IonNote></IonNote>
                      </IonItem>
                    ))}
                  </IonList>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2"
                  >
                    <IonInput
                      id="title"
                      label="Product Name"
                      fill="outline"
                      autoFocus
                      placeholder="Enter product name"
                      {...register("title", { required: true })}
                    />
                    <IonInput
                      id="price"
                      label="Product Price"
                      type="number"
                      fill="outline"
                      inputMode="numeric"
                      autoFocus
                      placeholder="0.00"
                      {...register("price", { required: true })}
                    />

                    <IonButton type="submit">Add To List</IonButton>
                  </form>
                  <IonButton
                    disabled={products.length < 2}
                    onClick={handleSave}
                  >
                    Submit
                  </IonButton>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
          </Swiper>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
