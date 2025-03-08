export enum RouterType {
  HASH = "hash",
  HISTORY = "history"
}

export enum MouseEventType {
  CLICK = 'click',
  DBCLICK = 'dblclick',
  CONTEXT_MENU = 'contextmenu', 
  MOUSE_DOWN = 'mousedown', 
  MOUSE_UP = 'mouseup', 
  MOUSE_ENTER = 'mouseenter', 
  MOUSE_OUT = 'mouseout', 
  MOUSE_OVER = 'mouseover'
}

export interface TrackReportPluginOption {
  routerType: ValueOf<RouterType>;
  mouseEventList: ValueOf<MouseEventType>[];
  hasVueRouter: boolean;
}

export type ValueOf<T> = T[keyof T];
