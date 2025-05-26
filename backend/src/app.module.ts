// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 匯入你剛剛建立的 Entities
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { PointsTransaction } from './entities/points-transaction.entity';
import { PurchaseRequest } from './entities/purchase-request.entity';
import { PurchaseAssignment } from './entities/purchase-assignment.entity';
import { Review } from './entities/review.entity';

import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    // 讓所有地方都能使用 process.env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 設定 TypeORM 並整合 Entity
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        // 👇 明確列出 Entity
        entities: [
          User,
          Product,
          PointsTransaction,
          PurchaseRequest,
          PurchaseAssignment,
          Review,
        ],
        synchronize: true, // 開發時才開，正式環境請關掉
      }),
    }),

    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
