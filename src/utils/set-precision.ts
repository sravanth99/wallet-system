export const setPrecision = (value: number, precision = 4) => {
  return parseFloat(value.toFixed(precision));
};
