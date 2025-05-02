import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class OptionalParseBoolPipe implements PipeTransform {
  transform(value: any): boolean | undefined {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    const lowered = value.toLowerCase?.();
    if (lowered === 'true') return true;
    if (lowered === 'false') return false;

    throw new BadRequestException(
      `Validation failed (boolean string is expected, got: ${value})`,
    );
  }
}
