import { BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

/**
 * Validates if a string value is a valid MongoDB ObjectId.
 * @param {string} value - The input value to validate.
 * @param {string} name - The name of the field being validated (used for error message).
 * @returns {string} - The valid ObjectId value.
 * @throws {BadRequestException} - Throws a BadRequestException if the value is not a valid ObjectId.
 */
export const validateObjectId = (value: string, name: string) => {
  if (isValidObjectId(value)) {
    return value;
  } else {
    throw new BadRequestException(`${name} should be a valid ObjectId`);
  }
};
