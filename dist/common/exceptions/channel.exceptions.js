"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelDisabledException = exports.ChannelNotAssociatedException = exports.ChannelAlreadyExistsException = exports.ChannelNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class ChannelNotFoundException extends common_1.HttpException {
    constructor(channelId) {
        super({
            statusCode: common_1.HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: `Channel with id "${channelId}" not found`,
        }, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.ChannelNotFoundException = ChannelNotFoundException;
class ChannelAlreadyExistsException extends common_1.HttpException {
    constructor(name) {
        super({
            statusCode: common_1.HttpStatus.CONFLICT,
            error: 'Conflict',
            message: `Channel with name "${name}" already exists`,
        }, common_1.HttpStatus.CONFLICT);
    }
}
exports.ChannelAlreadyExistsException = ChannelAlreadyExistsException;
class ChannelNotAssociatedException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
            message: 'Channel is not associated with this product',
        }, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ChannelNotAssociatedException = ChannelNotAssociatedException;
class ChannelDisabledException extends common_1.HttpException {
    constructor(channelName) {
        super({
            statusCode: common_1.HttpStatus.FORBIDDEN,
            error: 'Forbidden',
            message: `Channel "${channelName}" is not enabled for this product`,
        }, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ChannelDisabledException = ChannelDisabledException;
//# sourceMappingURL=channel.exceptions.js.map