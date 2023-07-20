import { StripWhitespacesPipe } from './strip-whitespaces.pipe';

describe('StripWhitespacesPipe', () => {
  let stripWhitespacesPipe: StripWhitespacesPipe;

  beforeEach(() => {
    stripWhitespacesPipe = new StripWhitespacesPipe();
  });

  it('should trim a string value', () => {
    const value = '  oops ';
    const result = stripWhitespacesPipe.transform(value);
    expect(result).toBe('oops');
  });

  it('should not trim a non-string value', () => {
    const value = 42;
    const result = stripWhitespacesPipe.transform(value);
    expect(result).toBe(value);
  });
});
