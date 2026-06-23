import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    send(productId: string, dto: SendNotificationDto, correlationId: string): Promise<{
        notificationId: string;
        status: string;
        channel: string;
        destination: string;
        timestamp: string;
    }>;
    findOne(id: string): Promise<{
        notificationId: string;
        status: string;
        message: string;
    }>;
    findAll(productId?: string, page?: number, limit?: number): Promise<{
        data: never[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        message: string;
    }>;
}
