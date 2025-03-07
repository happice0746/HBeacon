import { HBeaconPlugin } from "@HBeacon/types";
import { rewriteNativeMethod } from "@HBeacon/utils";
import { ConsoleReportLevel, ConsoleReportMsg, ConsoleReportPluginOption } from "./types";
export default function ConsoleReportPlugin (option: ConsoleReportPluginOption): HBeaconPlugin{
  return {
    name: "console-report-plugin",
    monitor: function (report: (data: ConsoleReportMsg) => void) {
      if (!window.console) {
        console.error("console is not supported in this environment");
        return;
      }
      const { levels } = option;
      for (const level of levels) {
        rewriteNativeMethod(window.console ,level as string, function(originalMethod: ()=>any) {
          return function(...args: any) {
            originalMethod.apply(window.console, args);
            report({
              level,
              args,
            })
        }
      });
      }
    }
  }
}