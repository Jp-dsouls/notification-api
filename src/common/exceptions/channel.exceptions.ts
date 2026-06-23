import { HttpException, HttpStatus } from '@nestjs/common';

export class ChannelNotFoundException extends HttpException {
  constructor(channelId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: `Channel with id "${channelId}" not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class ChannelAlreadyExistsException extends HttpException {
  constructor(name: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        error: 'Conflict',
        message: `Channel with name "${name}" already exists`,
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class ChannelNotAssociatedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: 'Channel is not associated with this product',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class ChannelDisabledException extends HttpException {
  constructor(channelName: string) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        error: 'Forbidden',
        message: `Channel "${channelName}" is not enabled for this product`,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}