import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like, ILike } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveProductDto } from './interface/save-product.dto';
import { ProductStoreEntity } from '../product-store/entity/product-store.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductStoreEntity)
    private readonly productStoreRepository: Repository<ProductStoreEntity>,
  ) {}

  async findOneOrFail(id: string) {
    try {
      return await this.productRepository.findOneOrFail(id as any);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async save(product: SaveProductDto): Promise<any> {
    return await this.productRepository.save(
      this.productRepository.create(product),
    );
  }

  async deleteById(id: string) {
    const product = await this.productRepository.findOneById(id);
    if (!product) throw new NotFoundException('Produto não encontrado');

    await this.productStoreRepository.softDelete({ _productId: parseInt(id) });
    return await this.productRepository.softDelete(parseInt(id));
  }

  async findAll(
    page: number,
    limit: number,
    id?: string,
    description?: string,
    amount?: number,
  ) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (id) Object.assign(where, { id: parseInt(id) });
    if (description)
      Object.assign(where, { description: ILike(`${description}%`) });
    if (amount) Object.assign(where, { amount });

    const [items, total] = await this.productRepository.findAndCount({
      where,
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return { items, total, page, limit, totalPages };
  }

  async findById(id: string) {
    return await this.productRepository.findOneBy({ id: parseInt(id) });
  }

  async update(id: number, data: ProductEntity) {
    const product = await this.productRepository.findOneById(id);
    this.productRepository.merge(product, data);

    return await this.productRepository.save(product);
  }
}
