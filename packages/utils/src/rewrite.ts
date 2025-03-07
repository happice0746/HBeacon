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

