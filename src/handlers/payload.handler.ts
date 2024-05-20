import { applyDecorators, BadRequestException, SetMetadata, UseInterceptors } from '@nestjs/common';
import * as yup from 'yup';

export const Sanitize = (schema: yup.ObjectSchema<any>) => {
  return applyDecorators(SetMetadata('validationSchema', schema), UseInterceptors(new ValidationInterceptor(schema)));
};

export class ValidationInterceptor {
  constructor(private readonly schema: yup.ObjectSchema<any>) {}

  async intercept(context, next) {
    const request = context.switchToHttp().getRequest();
    try {
      let params: any = {};

      if (request.body) params = { ...params, ...request.body };
      if (request.params) params = { ...params, ...request.params };
      if (request.query) params = { ...params, ...request.query };

      const validatedPayload = await this.schema.validate(params, {
        abortEarly: true,
        stripUnknown: true,
        recursive: true,
      });

      request.payload = validatedPayload;
      request.sanitized = true;
      return next.handle();
    } catch (error) {
      throw new BadRequestException(error?.errors[0]);
    }
  }
}

export interface RequestX extends Request {
  payload: any;
  sanitized: boolean;
}
