"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateNotBelongToProductException = exports.TemplateNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class TemplateNotFoundException extends common_1.HttpException {
    constructor(templateId) {
        super({
            statusCode: common_1.HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: `Template with id "${templateId}" not found`,
        }, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.TemplateNotFoundException = TemplateNotFoundException;
class TemplateNotBelongToProductException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.FORBIDDEN,
            error: 'Forbidden',
            message: 'Template does not belong to this product',
        }, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.TemplateNotBelongToProductException = TemplateNotBelongToProductException;
//# sourceMappingURL=template.exceptions.js.map