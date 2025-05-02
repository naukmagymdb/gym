import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class DefaultEnumPipe<T> implements PipeTransform {
  constructor(
    private readonly enumValues: T[],
    private readonly defaultValue: T,
  ) {}

  transform(value: T, metadata: ArgumentMetadata) {
    if (value === undefined || value === null) {
      return this.defaultValue;
    }

    if (!this.enumValues.includes(value)) {
      throw new BadRequestException(
        `Validation failed. Allowed values are: ${this.enumValues.join(', ')}`,
      );
    }

    return value;
  }
}
