import { HBeaconOption, HBeaconPlugin } from '@HBeacon/types';
import { getPageInfo, getUserDeviceInfo, sendBeacon } from '@HBeacon/utils';
export class HBeacon {
  private _option: HBeaconOption;
  private _linkedPlugins: string[];
  constructor(customOption: HBeaconOption) {
    this._option = customOption;
    this._linkedPlugins = [];
    if (!window) {
      console.error('HBeacon must run in browser environment');
      return;
    }
  }

  use(plugins: HBeaconPlugin[]) {
    for (const plugin of plugins) {
      const { name, monitor } = plugin;
      if (!name || !monitor) {
        console.error('plugin must have name and monitor method');
        continue;
      }
      if (this._linkedPlugins.indexOf(name) !== -1) {
        console.error('plugin has been used');
        continue;
      }
      this._linkedPlugins.push(name);
      try {
        monitor.call(this, this.report.bind(this));
      } catch {
        console.error('monitor is called with error');
      }
    }
  }

  report<T = any>(data: T) {
    sendBeacon(this._option.url, this.encapsulated(data));
  }

  encapsulated<T = any>(data: T) {
    const header = {
      name: this._option.name,
      time: new Date().getTime(),
      deviceInfo: getUserDeviceInfo(),
      pageInfo: getPageInfo(),
    }
    return {
      header,
      body: data,
    }
  }
}
