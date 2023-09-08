import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreEntity } from './entity/store.entity';
import { Repository } from 'typeorm';
import { SaveStoreDto } from './interface/save-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
  ) {}

  async save(store: SaveStoreDto): Promise<any> {
    return await this.storeRepository.save(this.storeRepository.create(store));
  }
}
