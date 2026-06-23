import { Injectable, LoggerService } from '@nestjs/common';
import { CORRELATION_ID_HEADER } from '../middleware/correlation-id.middleware';

export interface LogContext {
  correlationId?: string;
  service?: string;
  [key: string]: unknown;
}

@Injectable()
export class AppLogger implements LoggerService {
  private context?: string;
  private correlationId?: string;

  constructor(context?: string, correlationId?: string) {
    this.context = context;
    this.correlationId = correlationId;
  }

  log(message: string, context?: string) {
    this.writeLog('LOG', message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.writeLog('ERROR', message, context, trace);
  }

  warn(message: string, context?: string) {
    this.writeLog('WARN', message, context);
  }

  debug(message: string, context?: string) {
    this.writeLog('DEBUG', message, context);
  }

  verbose(message: string, context?: string) {
    this.writeLog('VERBOSE', message, context);
  }

  private writeLog(level: string, message: string, context?: string, trace?: string) {
    const logContext = context || this.context;
    const correlationId = this.correlationId || 'N/A';
    const timestamp = new Date().toISOString();

    const logEntry = {
      timestamp,
      level,
      service: 'notification-api',
      context: logContext,
      correlationId,
      message,
    };

    if (level === 'ERROR' && trace) {
      console.error(JSON.stringify(logEntry), trace);
    } else if (level === 'WARN') {
      console.warn(JSON.stringify(logEntry));
    } else if (level === 'DEBUG' || level === 'VERBOSE') {
      console.debug(JSON.stringify(logEntry));
    } else {
      console.log(JSON.stringify(logEntry));
    }
  }

  setCorrelationId(correlationId: string) {
    this.correlationId = correlationId;
  }
}
