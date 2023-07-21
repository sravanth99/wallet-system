/**
 * Rounds a number to the specified precision.
 * @param {number} value - The number to round.
 * @param {number} [precision=4] - The number of decimal places to keep (default is 4).
 * @returns {number} - The rounded number.
 */
export const setPrecision = (value: number, precision = 4) => {
  return parseFloat(value.toFixed(precision));
};
