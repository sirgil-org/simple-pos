import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import { UserPhoto } from "../types";

export function usePhotoGallery() {
  const [photo, setPhoto] = useState<UserPhoto>(null);

  const getPhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      quality: 100,
    });

    const fileName = crypto.randomUUID() + ".jpeg";

    setPhoto({
      filepath: fileName,
      webviewPath: photo.dataUrl,
    });
  };

  const removePhoto = () => {
    console.log("removed photo....");
    setPhoto(null);
  };

  return {
    getPhoto,
    photo,
    removePhoto,
  };
}
