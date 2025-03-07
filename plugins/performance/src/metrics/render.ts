import { formatDecimal } from "@HBeacon/utils";

// export function getLCP() {
//   if (window?.PerformanceObserver) {
//     new PerformanceObserver((entryList) => {  
//       for (const entry of entryList.getEntries()) {  
//         return entry.startTime;
//       }
//     }).observe({type: 'largest-contentful-paint', buffered: true});
//   }
//   // console.error('performance is not supported in this environment');
//   // return -1;
// }

export function getFP() {
  if (window?.performance) {
    return performance.getEntriesByType("paint").filter(entry => {
      return entry.name === 'first-paint';
    })[0].startTime;
  }
  console.error('performance is not supported in this environment');
  return -1;
  
}

export function getFCP() {
  if (window?.performance) {
    return performance.getEntriesByType("paint").filter(entry => {
      return entry.name === 'first-contentful-paint';
    })[0].startTime;
  }
  console.error('performance is not supported in this environment');
  return -1;
}

export function getTTI() {
  return createPerformanceObserver({entryTypes: ['longtask']});
}

function createPerformanceObserver(options: PerformanceObserverInit) {
  return new Promise<number>((resolve) => {
    if (window?.PerformanceObserver) {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          observer.disconnect();
          resolve(entry.startTime);
        }
      });
      observer.observe(options);
    } else {
      resolve(-1);
    }
  });
}

export async function getLCP(): Promise<number> {
  return createPerformanceObserver( { type: 'largest-contentful-paint', buffered: true });
}

export const getRenderMetrics = async () => {
  // const [fcp, lcp, fp] = await Promise.all([
  //   getFCP(),
  //   getLCP(),
  //   getFP(),
  //   // getTTI(),
  // ]);
  // return {
  //   fcp: formatDecimal(fcp, 3),
  //   lcp: formatDecimal(lcp, 3),
  //   fp: formatDecimal(fp, 3),
  //   // tti: formatDecimal(tti, 3),
  // };
  const [lcp, tti] = await Promise.all([
    getLCP(),
    getTTI(),
  ]);
  const fcp = getFCP();
  const fp = getFP();
  return {
    lcp: formatDecimal(lcp, 3),
    fcp: formatDecimal(fcp, 3),
    fp: formatDecimal(fp, 3),
    tti: formatDecimal(tti, 3),
  }
};