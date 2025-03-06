import { HBeaconPlugin } from "@HBeacon/types";
import { rewriteNativeMethod } from "@HBeacon/utils";
import { ConsoleReportMsg, ConsoleReportPluginOption } from "./types";
export default function consoleReportPlugin (option: ConsoleReportPluginOption): HBeaconPlugin{
  return {
    name: "console-report-plugin",
    monitor: function (report: (data: ConsoleReportMsg) => void) {
      if (!window.console) {
        console.error("console is not supported in this environment");
        return;
      }
      const { levels } = option;
      for (const level of levels) {
        rewriteNativeMethod(window.console ,level, function(originalMethod: ()=>any) {
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