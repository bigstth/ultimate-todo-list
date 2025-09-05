import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!isMongoId(value)) {
      throw new BadRequestException('Invalid Id');
    }
    return value;
  }
}
