import { BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export const validateObjectId = (value: string, name: string) => {
  if (isValidObjectId(value)) {
    return value;
  } else {
    throw new BadRequestException(`${name} should be a valid ObjectId`);
  }
};
