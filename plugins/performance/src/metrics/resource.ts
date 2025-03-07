import { formatDecimal } from '@HBeacon/utils';
import { ResourceItem } from '../types';

export const getResource = (): ResourceItem[] => {
  return performance.getEntriesByType('resource').map((entry: PerformanceEntry) => ({
    file: entry.name,
    time: formatDecimal(entry.duration, 3)
  }));
}
