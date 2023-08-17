import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodError } from 'zod';

const serializeValidationError = (err: ZodError) => {
  return err.issues;
};

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const { schema } = metatype.prototype;
    if (!schema) return value;

    try {
      return await schema.parseAsync(value);
    } catch (err) {
      throw new BadRequestException(serializeValidationError(err as ZodError));
    }
  }
}
