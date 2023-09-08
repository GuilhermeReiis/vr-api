import { ProductEntity } from 'src/apps/product/entity/product.entity';
import { StoreEntity } from 'src/apps/store/entity/store.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'product-store' })
export class ProductStoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: '_productId', nullable: false })
  _productId: number;

  @Column({ name: '_storeId', nullable: false })
  _storeId: number;

  @Column({ name: 'amount', nullable: true, default: '0' })
  amount: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: '_productId', referencedColumnName: 'id' })
  product: ProductEntity;

  @ManyToOne(() => StoreEntity)
  @JoinColumn({ name: '_storeId', referencedColumnName: 'id' })
  store: StoreEntity;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date; // Coluna para rastrear a data de exclusão lógica
}
