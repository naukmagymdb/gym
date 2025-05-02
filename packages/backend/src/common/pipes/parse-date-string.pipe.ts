import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { DateTime } from 'luxon';

@Injectable()
export class ParseDateStringPipe implements PipeTransform {
  transform(value: any) {
    if (!value) return value;

    return TransformDateString(value);
  }
}

export function TransformDateString(value: any) {
  if (!value) return value;

  try {
    const timezone = 'Europe/Kiev';
    let transformedDate;

    if (typeof value === 'string') {
      transformedDate = DateTime.fromISO(value, { zone: 'UTC' })
        .setZone(timezone)
        .toISO();
    }

    if (!transformedDate) {
      throw new BadRequestException(`Invalid date format: ${value}`);
    }

    return transformedDate;
  } catch (error) {
    throw new BadRequestException(`Error transforming date: ${error.message}`);
  }
}
