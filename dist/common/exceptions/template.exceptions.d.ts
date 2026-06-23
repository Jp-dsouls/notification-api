import { HttpException } from '@nestjs/common';
export declare class TemplateNotFoundException extends HttpException {
    constructor(templateId: string);
}
export declare class TemplateNotBelongToProductException extends HttpException {
    constructor();
}
