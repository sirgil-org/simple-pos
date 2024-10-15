import { supabase } from "../supabase_client";
import { decode } from 'base64-arraybuffer';

export async function base64FromPath(path: string): Promise<string> {
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

export const uploadImage = async (vendor_id, photo) => {
  const base64Data = await base64FromPath(photo.webviewPath!);
  return supabase.storage
    .from(`product-images`)
    .upload(`${vendor_id}/${photo.filepath}`, decode(base64Data.split(',')[1]), {
      contentType: "image/jpeg",
      cacheControl: "3600",
      upsert: false,
    });
};
