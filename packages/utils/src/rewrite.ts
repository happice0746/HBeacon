import { ContainMethodObject } from "./types";

export function rewriteNativeMethod(source: ContainMethodObject, method: string, newMethodWrapper: (...args: any[]) => any, isForced: boolean = false) {
  if(!source[method] && !isForced) {
    console.error(`method ${method} is not exist in source`);
    return;
  }
  const originalMethod = source[method];
  const newMethod = newMethodWrapper(originalMethod); 
  source[method] = newMethod;
}

