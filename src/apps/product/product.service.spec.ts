import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  describe('save', () => {
    it('should save a product', async () => {
      const data: ProductEntity = {
        id: 1,
        description: 'Test',
        amount: 10,
        image: 'test.png',
      };

      const productEntityMock = {
        id: 1,
        description: 'Test',
        amount: 10,
        image: 'test.png',
      } as ProductEntity;
      jest
        .spyOn(productRepository, 'create')
        .mockReturnValueOnce(productEntityMock);

      jest
        .spyOn(productRepository, 'save')
        .mockResolvedValueOnce(productEntityMock);

      const result = await productService.save(data);
      expect(result).toBeDefined();
      expect(productRepository.create).toBeCalledTimes(1);
      expect(productRepository.save).toBeCalledTimes(1);
    });
  });
});
