"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TrackingIdMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingIdMiddleware = exports.TRACKING_ID_HEADER = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
exports.TRACKING_ID_HEADER = 'x-tracking-id';
let TrackingIdMiddleware = TrackingIdMiddleware_1 = class TrackingIdMiddleware {
    constructor() {
        this.logger = new common_1.Logger(TrackingIdMiddleware_1.name);
    }
    use(req, res, next) {
        const trackingId = req.headers[exports.TRACKING_ID_HEADER] || (0, uuid_1.v4)();
        req.headers[exports.TRACKING_ID_HEADER] = trackingId;
        res.setHeader(exports.TRACKING_ID_HEADER, trackingId);
        this.logger.log(`[${trackingId}] ${req.method} ${req.url}`);
        next();
    }
};
exports.TrackingIdMiddleware = TrackingIdMiddleware;
exports.TrackingIdMiddleware = TrackingIdMiddleware = TrackingIdMiddleware_1 = __decorate([
    (0, common_1.Injectable)()
], TrackingIdMiddleware);
//# sourceMappingURL=tracking-id.middleware.js.map