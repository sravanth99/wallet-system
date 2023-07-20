import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StripWhitespacesPipe implements PipeTransform {
  transform(value: any) {
    if (value && typeof value === 'string') {
      return value.trim();
    }
    return value;
  }
}
