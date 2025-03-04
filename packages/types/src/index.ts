interface BaseErrorInfo {
  traceId: string;
  project: string;
  pageUrl: string;
  version: string;
  rowNum: number;
  colNum: number;
  errorType: ERROR_TYPE;
  errorLevel: ERROR_LEVEL;
  content: string;
  timestamp: string;
  tags: Object
}

interface ErrorInfo_AJAX extends BaseErrorInfo {
  resourceUrl: string;
  method: string;
  status: string;
  responseTime: string;
  requestTime: string;
}

interface ErrorInfo_RESOURCE extends BaseErrorInfo {
  resourceUrl: string;
  responseTime: string;
  requestTime: string;
  responseSize: string;
  status: number;
}

interface ErrorInfo_JS extends BaseErrorInfo {
  stack: string;
  jsErrorType: JS_ERROR_TYPE;
}

interface TrackInfo_PV extends BaseTrackInfo {}


interface TrackInfo_PD extends BaseTrackInfo  {}

interface TrackInfo_MV {
  moduleId: string;
}


interface TrackInfo_MC extends BaseTrackInfo {
  moduleId: string;
}

interface DeviceInfo {
  deviceType: string; // 设备类型 pc | mobile | pad
  os: string; // 操作系统 windows | mac | ios | android
  osVersion: string; // 操作系统版本
  browser: string; // 浏览器类型
  browserVersion: string; // 浏览器版本
  screenWidth: number; // 屏幕宽度
  screenHeight: number; // 屏幕高度
}

interface BaseTrackInfo {
  pageId: string;
  version: string;
  pageUrl: string;
  timestamp: string;
  deviceInfo: DeviceInfo;
  tags: Object;
}

enum ERROR_TYPE {
  AJAX = "ajax",
  RESOURCE = "resource",
  JS = "js",
}

enum ERROR_LEVEL {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  DEBUG = "debug",
}

enum JS_ERROR_TYPE {
  SyntaxError = "SyntaxError",
  TypeError = "TypeError",
  ReferenceError = "ReferenceError",
  RangeError = "RangeError",
  URIError = "URIError",
  EvalError = "EvalError",
  Error = "Error",
  UncaughtError = "UncaughtError",
  UnhandledRejection = "UnhandledRejection",
  UnknownError = "UnknownError",
}