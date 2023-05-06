import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './notification.controller';
import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Notification.name,
        useFactory: () => NotificationSchema,
      },
    ]),
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
