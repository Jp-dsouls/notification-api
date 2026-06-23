import { HttpException } from '@nestjs/common';
export declare class ProductNotFoundException extends HttpException {
    constructor(productId: string);
}
export declare class ProductAlreadyExistsException extends HttpException {
    constructor(name: string);
}
export declare class ProductInactiveException extends HttpException {
    constructor(name: string);
}
