import { Controller, Get, Query } from '@nestjs/common';
import { ResponseStatus } from '../basic/basic.dto';

@Controller('common')
export class CommonController {
  @Get('ping')
  async send(@Query('message') message: string) {
    return {
      status: ResponseStatus.SUCCESS,
      data: message,
    };
  }
}
