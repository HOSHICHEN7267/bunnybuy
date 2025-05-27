import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ 啟用全域 DTO 驗證
  app.useGlobalPipes(new ValidationPipe());

  // ✅ 啟用 CORS，允許來自前端的請求
  app.enableCors({
    origin: 'http://localhost:5173', // ← 請依你的前端實際 port 設定
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
