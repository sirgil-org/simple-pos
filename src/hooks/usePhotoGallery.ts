import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import { UserPhoto } from "../types";

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const getPhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 100,
    });

    const fileName = crypto.randomUUID() + ".jpeg";
    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: `data:image/jpeg;base64,${photo.base64String}`,
      },
      ...photos,
    ];
    setPhotos(newPhotos);
  };

  return {
    getPhoto,
    photos,
  };
}
