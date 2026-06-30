import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { LoggerModule } from './logger/logger.module';
import { ProductsModule } from './products/products.module';
import { ChannelsModule } from './channels/channels.module';
import { ProductChannelsModule } from './product-channels/product-channels.module';
import { TemplatesModule } from './templates/templates.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    LoggerModule,
    PrismaModule,
    ProductsModule,
    ChannelsModule,
    ProductChannelsModule,
    TemplatesModule,
    NotificationsModule,
  ],
})
export class AppModule {}
