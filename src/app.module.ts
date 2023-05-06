import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from './module/notification/notification.module';

function loadModules(): Array<any> {
  const importModule = [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`,
    ),
    NotificationModule,
  ];
  return importModule;
}
@Module({
  imports: loadModules(),
})
export class AppModule {}
