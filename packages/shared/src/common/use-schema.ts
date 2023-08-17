import { ZodTypeAny } from 'zod';

export function UseSchema(schema: ZodTypeAny) {
  return function (target) {
    target.prototype.schema = schema;
  };
}
