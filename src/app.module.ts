import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

function loadModules(): Array<any> {
  const importModule = [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ];
  return importModule;
}
@Module({
  imports: loadModules(),
})
export class AppModule {}
