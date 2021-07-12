import { getImageById } from "../constants/endpoint";
import { getIdFromUrl } from "./urlUtils";

export function handleUrlImage(url: string) {
  const id = getIdFromUrl(url);
  const imageUrl = getImageById(id);
  return imageUrl;
}
