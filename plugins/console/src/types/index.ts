export interface ConsoleReportPluginOption {
  levels: ConsoleReportLevel[];
  
}

export enum ConsoleReportLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

export interface ConsoleReportMsg {
  level: ConsoleReportLevel;
  args: any;
} 