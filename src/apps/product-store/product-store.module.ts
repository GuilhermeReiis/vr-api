import { Module, forwardRef } from '@nestjs/common';
import { ProductStoreService } from './product-store.service';
import { ProductStoreController } from './product-store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductStoreEntity } from './entity/product-store.entity';
import { StoreEntity } from '../store/entity/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductStoreEntity, StoreEntity])],
  providers: [ProductStoreService],
  controllers: [ProductStoreController],
})
export class ProductStoreModule {}
