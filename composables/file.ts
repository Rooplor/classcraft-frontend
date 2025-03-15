export const getFileNameFromUrl = (url: string): string => {
  const parts = url.split("/");
  return parts[parts.length - 1].substring(14);
};
