import { z } from 'zod';

const errorMap: z.ZodErrorMap = ({ code, ...params }, ctx) => {
  let modCode: string = code;

  if (params['validation']) modCode += `_${params['validation']}`;
  if (modCode === 'too_small' && params['minimum'] == 1) modCode = `non_empty`;

  const error = {
    text: ctx.defaultError,
    code: modCode,
    params: params,
  };

  return {
    message: JSON.stringify(error),
  };
};

export const zodErrorMapInit = () => z.setErrorMap(errorMap);
