import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductCatalogModule } from './product_catalog/product_catalog.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { dataBaseConfig } from './database/database.config';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        '.env.development.local',
        '.env.development',
        '.env.staging',
      ],
      // load: [appConfig],
    }),
    SequelizeModule.forRoot(dataBaseConfig),
    ProductCatalogModule,
    TransactionModule,
  ],
  providers: [AppService],
})
export class AppModule {}
