import { MouseEventType, RouterType, TrackReportPluginOption, ValueOf } from "./type"
import { rewriteNativeMethod } from "@HBeacon/utils";

// https://blog.csdn.net/qq1337715208/article/details/138742753
export default function TrackReportPlugin(option: TrackReportPluginOption) {
  return {
    name: "track-report-plugin",
    monitor(report: any) {
      const { routerType, mouseEventList, hasVueRouter } = option;
      trackElements(mouseEventList, report);
      if (!window.history) {
        return;
      }   
      trackPage(routerType, report, hasVueRouter);
    }
  }
}

function trackElements(mouseEventList: ValueOf<MouseEventType>[], report: (data: any) => void) {
  for(const event of mouseEventList) {
    window.addEventListener(event as string, (e)=>{
      const element = e.target as HTMLElement;
      const trackElementId = element.getAttribute("trackElementId")
      if (trackElementId) {
        report({
          event,
          trackElementId,
        })
      }
    })
  }
}

function trackPage(routerType: ValueOf<RouterType>, report: (data: any) => void, hasVueRouter: boolean) {
  if(routerType === RouterType.HASH && !hasVueRouter) {
    rewriteNativeMethod(window, "onhashchange", function(originalMethod) {
      return function(...arg: any[]) {
        if (originalMethod) originalMethod.apply(window, arg);
        report({
          routerType,
        })
      }
    }, true)
  } else if(routerType === RouterType.HISTORY || hasVueRouter) {
    rewriteNativeMethod(window.history, "pushState", function(originalMethod) {
      return function(...arg: any[]) {
        if (originalMethod) originalMethod.apply(window.history, arg);
        report({
          routerType,
        })
      }
    }, true)
    rewriteNativeMethod(window.history, "replaceState", function(originalMethod) {
      return function(...arg: any[]) {
        if (originalMethod) originalMethod.apply(window.history, arg);
        report({
          routerType,
        })
      }
    }, true)
    rewriteNativeMethod(window.history, "popState", function(originalMethod) {
      return function(...arg: any[]) {
        if (originalMethod) originalMethod.apply(window.history, arg);
        report({
          routerType,
        })
      }
    }, true)
  } 
}