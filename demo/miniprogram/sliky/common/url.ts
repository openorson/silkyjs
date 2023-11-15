export function objectToQueryString(object?: object) {
  if (!object) return "";

  const keyValuePairs = [];

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key as keyof typeof object];
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      keyValuePairs.push(`${encodedKey}=${encodedValue}`);
    }
  }

  return keyValuePairs.join("&");
}
