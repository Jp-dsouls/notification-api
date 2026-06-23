import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor(productId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: `Product with id "${productId}" not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class ProductAlreadyExistsException extends HttpException {
  constructor(name: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        error: 'Conflict',
        message: `Product with name "${name}" already exists`,
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class ProductInactiveException extends HttpException {
  constructor(name: string) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        error: 'Forbidden',
        message: `Product "${name}" is inactive`,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
