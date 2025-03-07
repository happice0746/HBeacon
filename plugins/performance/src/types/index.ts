export interface NetworkMetrics {
  dns: number;
  tcp: number;
  ssl: number;
  ttfb: number 
  trans: number;
  headerSize: number;
  redirectNum: number;
  redirect: number;
}

export interface ResourceItem {
  file: string;
  time: number;
}

export interface PerformanceMetricsReportPluginOption {
  type: ValueOf<PerformanceType>[];
}

export enum PerformanceType {
  RESOURCE = 'resource',
  NETWORK = 'network',
  RENDER = 'render',
}

type ValueOf<T> = T[keyof T];