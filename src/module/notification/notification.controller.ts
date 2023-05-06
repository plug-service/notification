import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BasicResponse, ResponseStatus } from '../basic/basic.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiTags('notification')
  @ApiResponse({
    status: 200,
    type: BasicResponse,
  })
  @ApiOperation({
    summary: 'test',
  })
  @Post('create')
  async create(): Promise<BasicResponse> {
    await this.notificationService.create({
      id: 1,
      age: 10,
      breed: 'sth',
    });

    return {
      status: ResponseStatus.SUCCESS,
    };
  }
}
