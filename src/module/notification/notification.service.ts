import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNotificationDto } from './dto/create.dto';
import { Notification } from './schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}

  async create(dto: CreateNotificationDto): Promise<Notification> {
    const record = await this.notificationModel.create(dto);
    return record;
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  }
}
