import { objectIntoFormData } from "./format";

export function sendBeacon(url:string, data:Record<string, any>) {
  if (!url || typeof url !== 'string') {
    console.error('Invalid URL');
    return false;
  }
  if (!data || typeof data !== 'object') {
    console.error('Invalid data');
    return false;
  }
  const formData = objectIntoFormData(data);
  return navigator.sendBeacon(url, formData);
}