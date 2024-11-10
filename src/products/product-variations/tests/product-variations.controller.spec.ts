import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariationsController } from '../product-variations.controller';
import { ProductVariationsService } from '../product-variations.service';
import { productVariationMock } from './mocks/product-variation.mock';
import { ReturnProductVariationDto } from '../dto/return-product-variation.dto';
import { returnProductVariationDtoMock } from './mocks/return-product-variation-dto.mock';
import { updateProductVariationMock } from './mocks/update-product-variation.mock';
import { productMock } from './../../../products/tests/mocks/product.mock';

describe('ProductVariationsController', () => {
  let controller: ProductVariationsController;
  let service: ProductVariationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVariationsController],
      providers: [
        {
          provide: ProductVariationsService,
          useValue: {
            create: jest.fn().mockResolvedValue(productVariationMock),
            findAll: jest.fn().mockResolvedValue([productVariationMock]),
            findOne: jest.fn().mockResolvedValue(productVariationMock),
            update: jest.fn().mockResolvedValue(productVariationMock),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductVariationsController>(
      ProductVariationsController,
    );
    service = module.get<ProductVariationsService>(ProductVariationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a product variation', async () => {
      const product = await controller.create(
        productMock.id,
        productVariationMock,
      );

      expect(product).toEqual(
        new ReturnProductVariationDto(productVariationMock),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of product variations', async () => {
      const productVariations = await controller.findAll(
        productVariationMock.productId,
      );

      expect(productVariations).toEqual([returnProductVariationDtoMock]);
    });
  });

  describe('findOne', () => {
    it('should return a product variation', async () => {
      const product = await controller.findOne(productVariationMock.id);

      expect(product).toEqual(returnProductVariationDtoMock);
    });
  });

  describe('update', () => {
    it('should return a product variation', async () => {
      const product = await controller.update(
        productVariationMock.id,
        updateProductVariationMock,
      );

      expect(product).toEqual(returnProductVariationDtoMock);
    });
  });
});
