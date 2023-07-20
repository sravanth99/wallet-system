export const trimWhiteSpaces = (value: string, trim?: 'start' | 'end') => {
  if (trim === 'start') return value.trimStart();
  if (trim == 'end') return value.trimEnd();
  return value.trim();
};
