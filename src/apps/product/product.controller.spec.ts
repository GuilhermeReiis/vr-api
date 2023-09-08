import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
    expect(productService).toBeDefined();
  });

  describe('save', () => {
    it('should save a product', async () => {
      const body: ProductEntity = {
        id: 1,
        description: 'productTest',
        amount: 10,
        image: 'imageTest.png',
      };
      const productEntityMock = {
        id: 1,
        description: 'productTest',
        amount: 10,
        image: 'imageTest.png',
      } as ProductEntity;

      jest
        .spyOn(productService, 'save')
        .mockResolvedValueOnce(productEntityMock);

      const result = await productController.save(body);
      expect(result).toBeDefined();
      expect(productService.save).toBeCalledTimes(1);
    });
  });
});
