import { trimWhiteSpaces } from './trim-whitespaces';

const input = ' oops ';
const startTrimmed = 'oops ';
const endTrimmed = ' oops';
const trimmed = 'oops';

describe('trimWhiteSpaces', () => {
  it('should trim both start and end spaces', () => {
    const result = trimWhiteSpaces(input);
    expect(result).toBe(trimmed);
  });

  it('should trim only start spaces', () => {
    const result = trimWhiteSpaces(input, 'start');
    expect(result).toBe(startTrimmed);
  });

  it('should trim only end spaces', () => {
    const result = trimWhiteSpaces(input, 'end');
    expect(result).toBe(endTrimmed);
  });
});
