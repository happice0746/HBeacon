export interface HBeaconPlugin {
  name: string;
  monitor: (notify: (data: any) => void) => void;
}