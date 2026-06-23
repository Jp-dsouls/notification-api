import { HttpException, HttpStatus } from '@nestjs/common';

export class TemplateNotFoundException extends HttpException {
  constructor(templateId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: `Template with id "${templateId}" not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class TemplateNotBelongToProductException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        error: 'Forbidden',
        message: 'Template does not belong to this product',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
