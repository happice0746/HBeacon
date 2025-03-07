import { getRenderMetrics } from "./metrics/render";
import { getNetworkMetrics } from "./metrics/network";
import { getResource } from "./metrics/resource";
import { PerformanceMetricsReportPluginOption, PerformanceType } from "./types";

export default function PerformanceMetricsReportPlugin(options: PerformanceMetricsReportPluginOption) {
  const { type } = options;
  return {
    name: "performance-metircs-report-plugin",
    monitor(report: any) {
      window.addEventListener('load', async () => {
        if (type.includes(PerformanceType.NETWORK)) {
          report(getNetworkMetrics());
        }
        if (type.includes(PerformanceType.RESOURCE)) {
          report(getResource());
        }
        if (type.includes(PerformanceType.RENDER)) {
          report(await getRenderMetrics());
        }
      })
    }
  }
}