import { ContainMethodObject } from "./types";

export function rewriteNativeMethod(source: ContainMethodObject, method: string, newMethodWrapper: (...args: any[]) => any) {
  if(!source[method]) {
    console.error(`method ${method} is not exist in source`);
    return;
  }
  const originalMethod = source[method];
  const newMethod = newMethodWrapper(originalMethod); 
  source[method] = newMethod;
}

export function objectIntoFormData(data: Record<string, any>) {
  const formData = new FormData();
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let value = data[key];
      if (typeof value !== 'string' && !(value instanceof Blob)) {
        value = JSON.stringify(value);
      }
      formData.append(key, value);
    }
  }
  return formData
}