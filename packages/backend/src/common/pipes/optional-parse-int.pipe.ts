import {
  ArgumentMetadata,
  Injectable,
  ParseIntPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class OptionalParseIntPipe implements PipeTransform {
  private parseIntPipe = new ParseIntPipe();

  transform(value: string, metadata: ArgumentMetadata) {
    if (!value) {
      return value;
    }

    return this.parseIntPipe.transform(value, metadata);
  }
}
