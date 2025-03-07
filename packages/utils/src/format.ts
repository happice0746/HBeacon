
export const formatDecimal = (num: number, decimal: number) => {
  if (!isFinite(num) || isNaN(num)) {
    return num;
  }

  if (!Number.isInteger(decimal) || decimal < 0) {
    return num;
  }

  return parseFloat(num.toFixed(decimal));
}

export function objectIntoFormData(data: Record<string, any>) {
  const formData = new FormData();
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let value = data[key];
      if (typeof value !== 'string' && !(value instanceof Blob)) {
        value = JSON.stringify(value);
      }
      formData.append(key, value);
    }
  }
  return formData
}