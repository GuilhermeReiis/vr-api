import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'description', length: 500, nullable: false })
  description: string;

  @Column({ name: 'amount', nullable: false, type: 'float' })
  amount: number;

  @Column({ name: 'image', nullable: true })
  image: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
