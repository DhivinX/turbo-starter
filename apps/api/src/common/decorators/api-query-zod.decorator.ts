import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { ZodTypeAny } from 'zod';

export function ApiQueryZod(zodSchema: ZodTypeAny): MethodDecorator {
  const schema = zodToOpenAPI(zodSchema);
  const decorators: MethodDecorator[] = [];

  for (const [key, schm] of Object.entries(schema.properties)) {
    decorators.push(
      ApiQuery({
        name: key,
        description: (schm as any).description,
        schema: schm,
      }),
    );
  }

  return applyDecorators(...decorators);
}
