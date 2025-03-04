export const getUserDeviceInfo = () => {
  if (window.navigator) {
    return {
      userAgent: navigator.userAgent,
    }
  }
}