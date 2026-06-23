import { Request } from 'express';
export declare class TrackingIdService {
    private readonly request;
    private trackingId;
    constructor(request: Request);
    getTrackingId(): string;
    getTrackingHeaders(): Record<string, string>;
}
