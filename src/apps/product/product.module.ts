import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { ProductStoreEntity } from '../product-store/entity/product-store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductStoreEntity])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
