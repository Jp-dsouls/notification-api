import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const TRACKING_ID_HEADER = 'x-tracking-id';

@Injectable()
export class TrackingIdMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TrackingIdMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const trackingId = (req.headers[TRACKING_ID_HEADER] as string) || uuidv4();

    req.headers[TRACKING_ID_HEADER] = trackingId;
    res.setHeader(TRACKING_ID_HEADER, trackingId);

    this.logger.log(
      `[${trackingId}] ${req.method} ${req.url}`,
    );

    next();
  }
}
