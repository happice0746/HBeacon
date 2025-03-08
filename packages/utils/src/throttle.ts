export function debounceWrapper(fn: Function, delay: number = 1000) {
  let timer: number | null = null;
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  }
}

export function throttleWrapper(fn: Function, delay: number = 1000) {
  let prevTime = Date.now();
  return function(this: any) {
    const nowTime= Date.now();
    if (nowTime - prevTime >= delay) {
      fn.apply(this, arguments)
      prevTime = Date.now()
    }
  }
}
