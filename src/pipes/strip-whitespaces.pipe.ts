import { Injectable, PipeTransform } from '@nestjs/common';

/**
 * Pipe that trims leading and trailing white spaces from string values.
 * doesn't do anything if passed value is not a string.
 * @implements {PipeTransform}
 */
@Injectable()
export class StripWhitespacesPipe implements PipeTransform {
  /**
   * Transforms the input value by trimming leading and trailing white spaces if it is a string.
   * @param value - The input value to be transformed.
   * @returns - The transformed value with leading and trailing white spaces removed, or the original value if it's not a string.
   */
  transform(value: any) {
    if (value && typeof value === 'string') {
      return value.trim();
    }
    return value;
  }
}
