import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import { UserPhoto } from "../types";

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const getPhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      quality: 100,
    });

    const fileName = crypto.randomUUID() + ".jpeg";

    // console.log(photo.dataUrl, " ------------------ photo data url");

    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: photo.dataUrl,
      },
      ...photos,
    ];

    setPhotos(newPhotos);
    return fileName;
  };

  const removePhoto = (path) => {
    photos.filter((item) => item.filepath != path);
    setPhotos(photos.filter((item) => item.filepath != path));
  };

  const clearPhotos = () => {
    setPhotos([])
  }

  const getLoadedPhoto = (path) => {
    return photos.find((item)=>item.filepath === path)
  }

  return {
    getPhoto,
    photos,
    removePhoto,
    getLoadedPhoto,
    clearPhotos,
  };
}
