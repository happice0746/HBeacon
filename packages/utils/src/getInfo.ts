import { DeviceInfo } from "@HBeacon/types"

class UserDeviceDetectionStrategy {
  private userAgentStr: string;
  private userAgentObj: DeviceInfo;
  constructor(userAgentStr: string) {
    this.userAgentStr = userAgentStr;
    this.userAgentObj = {
      browserName: '',
      browserVersion: '',
      osName: '',
      osVersion: '',
      deviceType: '',
      screenWidth: 0,
      screenHeight: 0,
    } as DeviceInfo;
  }

  // 浏览器检测策略
  detectBrowser() {
    const browserReg = {
      Chrome: /Chrome/,
      IE: /MSIE|Trident/,
      Firefox: /Firefox/,
      Opera: /Opera|OPR/,
      Safari: /Safari/,
      '360': /360SE/,
      QQBrowser: /QQBrowser/
    };

    for (const [browserName, regex] of Object.entries(browserReg)) {
      if (regex.test(this.userAgentStr)) {
        this.userAgentObj.browserName = browserName;
        this.getBrowserVersion(browserName);
        break;
      }
    }
  }

  // 获取浏览器版本
  getBrowserVersion(browserName: string) {
    switch (browserName) {
      case 'Chrome':
        this.userAgentObj.browserVersion = this.userAgentStr.split('Chrome/')[1].split(' ')[0];
        break;
      case 'IE':
        this.userAgentObj.browserVersion = this.userAgentStr.split('MSIE ')[1].split(';')[0];
        break;
      case 'Firefox':
        this.userAgentObj.browserVersion = this.userAgentStr.split('Firefox/')[1];
        break;
      case 'Opera':
        this.userAgentObj.browserVersion = this.userAgentStr.split('Version/')[1];
        break;
      case 'Safari':
        this.userAgentObj.browserVersion = this.userAgentStr.split('Version/')[1].split(' ')[0];
        break;
      case 'QQBrowser':
        this.userAgentObj.browserVersion = this.userAgentStr.split('Version/')[1].split(' ')[0];
        break;
      default:
        this.userAgentObj.browserVersion = '';
    }
  }

  // 设备和操作系统检测策略
  detectOSAndDevice() {
    const deviceReg = {
      Windows: /Windows NT/,
      Mac: /Mac OS X/,
      iPhone: /iPhone/,
      iPad: /iPad/,
      Android: /Android/
    };

    for (const [deviceName, regex] of Object.entries(deviceReg)) {
      if (regex.test(this.userAgentStr)) {
        this.userAgentObj.osName = deviceName;
        this.getOSVersion(deviceName);
        break;
      }
    }
  }

  // 获取操作系统版本
  getOSVersion(deviceName: string) {
    switch (deviceName) {
      case 'Windows':
        this.userAgentObj.osVersion = this.userAgentStr.split('Windows NT ')[1].split(';')[0];
        break;
      case 'Mac':
        this.userAgentObj.osVersion = this.userAgentStr.split('Mac OS X ')[1].split(')')[0];
        break;
      case 'iPhone':
        this.userAgentObj.osVersion = this.userAgentStr.split('iPhone OS ')[1].split(' ')[0];
        break;
      case 'iPad':
        this.userAgentObj.osVersion = this.userAgentStr.split('iPad; CPU OS ')[1].split(' ')[0];
        break;
      case 'Android':
        this.userAgentObj.osVersion = this.userAgentStr.split('Android ')[1].split(';')[0];
        this.userAgentObj.deviceType = this.userAgentStr.split('(Linux; Android ')[1].split('; ')[1].split(' Build')[0];
        break;
      default:
        this.userAgentObj.osVersion = '';
    }
  }

  detectDeviceScreen() {
    this.userAgentObj.screenWidth = window.screen.width;
    this.userAgentObj.screenHeight = window.screen.height;
  }
  // 执行检测
  execute() {
    this.detectBrowser();
    this.detectOSAndDevice();
    this.detectDeviceScreen();
    return this.userAgentObj;
  }
}

export const getUserDeviceInfo = () => {
  if (window.navigator) {
    let userAgentStr = navigator.userAgent;
    const deviceDetection = new UserDeviceDetectionStrategy(userAgentStr)
    const deviceInfo = deviceDetection.execute()
    return deviceInfo;
  }
  return {
    browserName: '', 
    browserVersion: '', 
    osName: '', 
    osVersion: '',
    deviceType: '',
    screenHeight: 0,
    screenWidth: 0,
  } as DeviceInfo;
}

export const getPageInfo = () => {
  if (window.location) {
    return {
      href: location.href,
      origin: location.origin,
    }
  }
  return {
    href: "",
    origin: "",
  }
}
