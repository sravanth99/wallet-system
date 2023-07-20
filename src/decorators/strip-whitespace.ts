import { registerDecorator, ValidationOptions } from 'class-validator';

export const StripWhitespace = <T>(validationOptions?: ValidationOptions) => {
  return (object: T, propertyName: string) => {
    registerDecorator({
      name: 'stripWhitespace',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value === 'string') {
            return value.trim() === value;
          }
          return true;
        },
      },
    });
  };
};
