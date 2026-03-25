export const simpleEncode = (data: unknown) => {
  return btoa(JSON.stringify(data))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

export const simpleDecode = (data: string): unknown => {
  return JSON.parse(atob(data.replace(/-/g, "+").replace(/_/g, "/")));
};
