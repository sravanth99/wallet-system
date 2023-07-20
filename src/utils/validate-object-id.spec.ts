import { BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

import { validateObjectId } from './validate-object-id';

jest.mock('mongoose', () => ({
  isValidObjectId: jest.fn(),
}));

describe('validateObjectId', () => {
  it('should return the value if it is a valid ObjectId', () => {
    // Mock isValidObjectId to return true for an invalid ObjectId
    (isValidObjectId as jest.Mock).mockReturnValue(true);

    const value = '60330ce44329433a20f25d45';
    const name = 'userId';
    const result = validateObjectId(value, name);

    expect(result).toBe(value);
    expect(isValidObjectId).toHaveBeenCalledWith(value);
  });

  it('should throw BadRequestException for an invalid ObjectId', () => {
    // Mock isValidObjectId to return false for an invalid ObjectId
    (isValidObjectId as jest.Mock).mockReturnValue(false);

    const value = 'invalidObjectId';
    const name = 'userId';

    try {
      validateObjectId(value, name);
      // If the function does not throw, the test should fail
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe(`${name} should be a valid ObjectId`);
    }

    expect(isValidObjectId).toHaveBeenCalledWith(value);
  });
});
