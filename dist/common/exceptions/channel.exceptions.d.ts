import { HttpException } from '@nestjs/common';
export declare class ChannelNotFoundException extends HttpException {
    constructor(channelId: string);
}
export declare class ChannelAlreadyExistsException extends HttpException {
    constructor(name: string);
}
export declare class ChannelNotAssociatedException extends HttpException {
    constructor();
}
export declare class ChannelDisabledException extends HttpException {
    constructor(channelName: string);
}
