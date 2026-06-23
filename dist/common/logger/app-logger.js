"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const common_1 = require("@nestjs/common");
let AppLogger = class AppLogger {
    constructor(context, correlationId) {
        this.context = context;
        this.correlationId = correlationId;
    }
    log(message, context) {
        this.writeLog('LOG', message, context);
    }
    error(message, trace, context) {
        this.writeLog('ERROR', message, context, trace);
    }
    warn(message, context) {
        this.writeLog('WARN', message, context);
    }
    debug(message, context) {
        this.writeLog('DEBUG', message, context);
    }
    verbose(message, context) {
        this.writeLog('VERBOSE', message, context);
    }
    writeLog(level, message, context, trace) {
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
        }
        else if (level === 'WARN') {
            console.warn(JSON.stringify(logEntry));
        }
        else if (level === 'DEBUG' || level === 'VERBOSE') {
            console.debug(JSON.stringify(logEntry));
        }
        else {
            console.log(JSON.stringify(logEntry));
        }
    }
    setCorrelationId(correlationId) {
        this.correlationId = correlationId;
    }
};
exports.AppLogger = AppLogger;
exports.AppLogger = AppLogger = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, String])
], AppLogger);
//# sourceMappingURL=app-logger.js.map