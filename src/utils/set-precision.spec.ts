import { setPrecision } from './set-precision';

describe('setPrecision', () => {
  it('should set precision for positive numbers', () => {
    const result = setPrecision(3.14159265359, 3);
    expect(result).toBe(3.142);
  });

  it('should set precision for negative numbers', () => {
    const result = setPrecision(-2.71828182846, 2);
    expect(result).toBe(-2.72);
  });

  it('should set default precision when not specified', () => {
    const result = setPrecision(1.23456789);
    expect(result).toBe(1.2346);
  });
});
