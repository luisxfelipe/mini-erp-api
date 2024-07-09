import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { paginationProductMock, productMock } from '../mocks/product.mock';
import { returnDeleteMock } from './../../mocks/return-delete.mock';
import { updateProductMock } from '../mocks/update-product.mock';
import { ReturnProductDto } from '../dto/return-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockResolvedValue(productMock),
            findAll: jest.fn().mockResolvedValue([productMock]),
            findAllPage: jest.fn().mockResolvedValue(paginationProductMock),
            findOne: jest.fn().mockResolvedValue(productMock),
            update: jest.fn().mockResolvedValue(productMock),
            remove: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a product', async () => {
      const product = await controller.create(productMock);

      expect(product).toEqual(new ReturnProductDto(productMock));
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = await controller.findAll();

      expect(products).toEqual([
        {
          id: productMock.id,
          name: productMock.name,
          description: productMock.description,
        },
      ]);
    });
  });

  describe('findAllPage', () => {
    /*
    it('should send a query to find products', async () => {
      const products = await controller.findAllPage();

      expect(products).toEqual(paginationProductMock);
    });

    
    it('should return an array of products', async () => {
      const searchMock = 'test';
      const takeMock = 10;
      const pageMock = 1;

      const spy = jest.spyOn(service, 'findAllPage');

      await controller.findAllPage(searchMock, takeMock, pageMock);

      expect(spy.mock.calls[0][0]).toEqual(searchMock);
      expect(spy.mock.calls[0][1]).toEqual(takeMock);
      expect(spy.mock.calls[0][2]).toEqual(pageMock);
    });*/
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const product = await controller.findOne(productMock.id);

      expect(product).toEqual({
        id: productMock.id,
        name: productMock.name,
        description: productMock.description,
      });
    });
  });

  describe('update', () => {
    it('should return a product', async () => {
      const product = await controller.update(
        productMock.id,
        updateProductMock,
      );

      expect(product).toEqual(productMock);
    });
  });

  describe('remove', () => {
    it('should return a delete result', async () => {
      const product = await controller.remove(productMock.id);

      expect(product).toEqual(returnDeleteMock);
    });
  });
});
