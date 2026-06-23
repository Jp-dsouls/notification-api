"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInactiveException = exports.ProductAlreadyExistsException = exports.ProductNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class ProductNotFoundException extends common_1.HttpException {
    constructor(productId) {
        super({
            statusCode: common_1.HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: `Product with id "${productId}" not found`,
        }, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.ProductNotFoundException = ProductNotFoundException;
class ProductAlreadyExistsException extends common_1.HttpException {
    constructor(name) {
        super({
            statusCode: common_1.HttpStatus.CONFLICT,
            error: 'Conflict',
            message: `Product with name "${name}" already exists`,
        }, common_1.HttpStatus.CONFLICT);
    }
}
exports.ProductAlreadyExistsException = ProductAlreadyExistsException;
class ProductInactiveException extends common_1.HttpException {
    constructor(name) {
        super({
            statusCode: common_1.HttpStatus.FORBIDDEN,
            error: 'Forbidden',
            message: `Product "${name}" is inactive`,
        }, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ProductInactiveException = ProductInactiveException;
//# sourceMappingURL=product.exceptions.js.map