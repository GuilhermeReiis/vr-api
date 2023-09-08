import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'store' })
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'description', length: 500, nullable: false })
  description: string;
}
