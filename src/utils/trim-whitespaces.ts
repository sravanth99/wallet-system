/**
 * Trims leading and/or trailing white spaces of a string.
 * @param {string} value - The input string to trim.
 * @param {('start' | 'end')} [trim] - `Optional`
 * Specify `start` to trim leading white spaces\
 *  `end` to trim trailing white spaces\
 * or omit to trim both.
 * @returns {string} - The trimmed string.
 */
export const trimWhiteSpaces = (value: string, trim?: 'start' | 'end') => {
  if (trim === 'start') return value.trimStart();
  if (trim == 'end') return value.trimEnd();
  return value.trim();
};
