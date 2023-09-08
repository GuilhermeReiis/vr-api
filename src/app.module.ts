import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './apps/product/product.module';
import { StoreModule } from './apps/store/store.module';
import { ProductStoreModule } from './apps/product-store/product-store.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DATABASE,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      //so deve ser ativado em ambiente de desenvolvimento
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ProductModule,
    StoreModule,
    ProductStoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
