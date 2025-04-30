import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class DefaultEnumPipe implements PipeTransform {
  constructor(
    private readonly enumValues: string[],
    private readonly defaultValue: string,
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (value === undefined || value === null) {
      value = this.defaultValue;
    }

    if (!this.enumValues.includes(value)) {
      throw new BadRequestException(
        `Validation failed. Allowed values are: ${this.enumValues.join(', ')}`,
      );
    }

    return value;
  }
}
