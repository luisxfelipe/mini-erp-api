import { Test, TestingModule } from '@nestjs/testing';
import { categoryMock } from './mocks/category.mock';
import { returnDeleteMock } from '../../../mocks/return-delete.mock';
import { CategoriesController } from '../categories.controller';
import { CategoriesService } from '../categories.service';
import { createCategoryMock } from './mocks/create-category.mock';
import { updateCategoryMock } from './mocks/update-category.mock';
import { ReturnCategoryDto } from '../dto/return-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([categoryMock]),
            create: jest.fn().mockResolvedValue(categoryMock),
            remove: jest.fn().mockResolvedValue(returnDeleteMock),
            update: jest.fn().mockResolvedValue(categoryMock),
            findOne: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create a new category', async () => {
      const category = await controller.create(createCategoryMock);

      expect(category).toEqual(new ReturnCategoryDto(categoryMock));
    });
  });

  describe('findAll', () => {
    it('should be able to return an array of categories', async () => {
      const categories = await controller.findAll();

      expect(categories).toEqual([new ReturnCategoryDto(categoryMock)]);
    });
  });

  describe('findOne', () => {
    it('should be able to return a category by id', async () => {
      const category = await controller.findOne(categoryMock.id);

      expect(category).toEqual(new ReturnCategoryDto(categoryMock));
    });

    it('should send id param to service', async () => {
      const spy = jest.spyOn(service, 'findOne');

      await controller.findOne(categoryMock.id);

      expect(spy).toHaveBeenCalledWith(categoryMock.id, true);
    });
  });

  describe('update', () => {
    it('should be able to update a category', async () => {
      const category = await controller.update(
        categoryMock.id,
        updateCategoryMock,
      );

      expect(category).toEqual(new ReturnCategoryDto(categoryMock));
    });

    it('should send id param and updateCategoryDto to service', async () => {
      const spy = jest.spyOn(service, 'update');

      await controller.update(categoryMock.id, updateCategoryMock);

      expect(spy).toHaveBeenCalledWith(categoryMock.id, updateCategoryMock);
    });
  });

  describe('remove', () => {
    it('should be able to delete a category', async () => {
      const category = await controller.remove(categoryMock.id);

      expect(category).toEqual(returnDeleteMock);
    });

    it('should send id param to service', async () => {
      const spy = jest.spyOn(service, 'remove');

      await controller.remove(categoryMock.id);

      expect(spy).toHaveBeenCalledWith(categoryMock.id);
    });
  });
});
