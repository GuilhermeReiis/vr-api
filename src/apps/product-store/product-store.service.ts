import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStoreEntity } from './entity/product-store.entity';
import { Repository } from 'typeorm';
import { SaveProductStoreDto } from './interface/save-product-store.dto';
import { StoreService } from '../store/store.service';
import { SaveStoreDto } from '../store/interface/save-store.dto';
import { StoreEntity } from '../store/entity/store.entity';
import { parse } from 'path';

@Injectable()
export class ProductStoreService {
  constructor(
    @InjectRepository(ProductStoreEntity)
    private readonly productStoreRepository: Repository<ProductStoreEntity>,
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
  ) {}

  async saveStore(store: SaveStoreDto): Promise<any> {
    return await this.storeRepository.save(this.storeRepository.create(store));
  }

  async save(data: SaveProductStoreDto): Promise<any> {
    const newStore = await this.saveStore({ description: data.store });
    if (!newStore) throw new BadRequestException('Erro ao criar nova loja');

    const productStore = {
      _storeId: newStore.id,
      _productId: data._productId,
      amount: data.amount,
    };

    const productStoreExists = await this.productStoreRepository.findOne({
      where: {
        _storeId: newStore.id,
        _productId: data._productId,
      },
    });
    if (productStoreExists)
      throw new BadRequestException('Produto já cadastrado na loja');

    return await this.productStoreRepository.save(
      this.productStoreRepository.create(productStore),
    );
  }

  async listSoreRegister(id) {
    return await this.productStoreRepository.find({
      where: {
        _productId: parseInt(id),
      },
      relations: ['product', 'store'],
    });
  }

  async deleteById(id: string) {
    const productStore = await this.productStoreRepository.findOneById(id);
    if (!productStore) throw new NotFoundException('Produto não encontrado');
    return await this.productStoreRepository.softDelete(parseInt(id));
  }

  async update(id: string, data: any) {
    const StoreId = data._storeId;

    delete data._productId;
    const product = await this.productStoreRepository.findOneById(parseInt(id));

    delete product._productId;
    const store = await this.storeRepository.findOneById(parseInt(StoreId));
    delete product._storeId;

    this.productStoreRepository.merge(product, data);
    this.storeRepository.merge(store, { description: data.store });

    await this.storeRepository.save(store);

    await this.productStoreRepository.save(product);

    return;
  }
}
