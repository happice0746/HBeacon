export interface ConsoleReportPluginOption {
  levels: ValueOf<ConsoleReportLevel>[];
  
}

export enum ConsoleReportLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

export interface ConsoleReportMsg {
  level: ValueOf<ConsoleReportLevel>;
  args: any;
} 

type ValueOf<T> = T[keyof T];