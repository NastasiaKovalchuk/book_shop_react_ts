export const generatePrice = (key: string, min = 5, max = 30) => {
  const numericPart = key.replace(/\D/g, "");
  const baseNumber = Number(numericPart) || 1;
  return (baseNumber % (max - min)) + min;
};
