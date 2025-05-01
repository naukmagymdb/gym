import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDateStringPipe implements PipeTransform {
  transform(value: any) {
    if (!value) return value;
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`Invalid date string: ${value}`);
    }
    return value;
  }
}
