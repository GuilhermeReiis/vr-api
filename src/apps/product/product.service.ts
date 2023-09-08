import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveProductDto } from './interface/save-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
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
    return await this.productRepository.softDelete(parseInt(id));
  }

  async findAll() {
    return await this.productRepository.find();
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
