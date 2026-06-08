export const getRemovedImages = (
  existingInDB: string[],
  keptByClient: string[],
): string[] => {
  const keptSet = new Set(keptByClient);

  return existingInDB.filter((url) => !keptSet.has(url));
};
