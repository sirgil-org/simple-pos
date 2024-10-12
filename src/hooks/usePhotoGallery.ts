import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import { UserPhoto } from "../types";

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const getPhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    // console.log("got the image ....... ", photo, ' ********');

    console.log('here again....')

    const fileName = crypto.randomUUID() + ".jpeg";
    console.log('file_name....', fileName)
    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: photo.webPath,
      },
      ...photos,
    ];

    console.log(newPhotos, ' ---- ', newPhotos.length)
    setPhotos(newPhotos);
  };


  return {
    getPhoto,
    photos,
  };
}
