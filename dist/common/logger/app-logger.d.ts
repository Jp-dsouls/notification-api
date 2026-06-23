import { LoggerService } from '@nestjs/common';
export interface LogContext {
    correlationId?: string;
    service?: string;
    [key: string]: unknown;
}
export declare class AppLogger implements LoggerService {
    private context?;
    private correlationId?;
    constructor(context?: string, correlationId?: string);
    log(message: string, context?: string): void;
    error(message: string, trace?: string, context?: string): void;
    warn(message: string, context?: string): void;
    debug(message: string, context?: string): void;
    verbose(message: string, context?: string): void;
    private writeLog;
    setCorrelationId(correlationId: string): void;
}
