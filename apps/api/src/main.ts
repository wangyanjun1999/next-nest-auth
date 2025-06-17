import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 跨域
  app.enableCors();

  // 全局管道
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true, // 自动转换请求体中的数据类型
      whitelist: true, // 过滤掉不在dto中的字段
      forbidNonWhitelisted: true, // 如果存在不在dto中的字段，则抛出异常
    }
  ));

  await app.listen(process.env.PORT ??8000);
}
bootstrap();
