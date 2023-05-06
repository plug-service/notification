import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

function loadModules(): Array<any> {
  const importModule = [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_MYSQL_HOST,
      port: 3306,
      username: process.env.DB_MYSQL_USERNAME,
      password: process.env.DB_MYSQL_PASSWORD || '',
      database: process.env.DB_MYSQL_NAME,
      entities: [],
    }),
  ];
  return importModule;
}
@Module({
  imports: loadModules(),
})
export class AppModule {}
