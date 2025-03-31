export const colorStyle = {
  background:
    "radial-gradient(51.73% 68.18% at 50% 50%, #005D9D 0%, #053B60 100%)",
};

export const encodeBase64 = (data) => {
  if (typeof window !== "undefined") {
    // Browser environment
    return btoa(JSON.stringify(data));
  } else {
    // Node.js environment
    return Buffer.from(JSON.stringify(data)).toString("base64");
  }
};

export const decodeBase64 = (encodedData) => {
  if (typeof window !== "undefined") {
    // Browser environment
    return JSON.parse(atob(encodedData));
  } else {
    // Node.js environment
    return JSON.parse(Buffer.from(encodedData, "base64").toString("utf-8"));
  }
};
