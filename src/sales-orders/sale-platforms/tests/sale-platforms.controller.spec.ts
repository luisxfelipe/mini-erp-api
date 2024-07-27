import { Test, TestingModule } from '@nestjs/testing';
import { SalePlatformsController } from '../sale-platforms.controller';
import { SalePlatformsService } from '../sale-platforms.service';
import { platformMock } from './mocks/platform.mock';
import { ReturnSalePlatformDto } from '../dto/return-sale-platform.dto';
import { returnDeleteMock } from './../../../mocks/return-delete.mock';

describe('SalePlatformsController', () => {
  let controller: SalePlatformsController;
  let service: SalePlatformsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalePlatformsController],
      providers: [
        {
          provide: SalePlatformsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([platformMock]),
            create: jest.fn().mockResolvedValue(platformMock),
            update: jest.fn().mockResolvedValue(platformMock),
            findOne: jest.fn().mockResolvedValue(platformMock),
            remove: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    controller = module.get<SalePlatformsController>(SalePlatformsController);
    service = module.get<SalePlatformsService>(SalePlatformsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a platform', async () => {
      const platform = await controller.create(platformMock);
      expect(platform).toEqual(new ReturnSalePlatformDto(platformMock));
      expect(service.create).toHaveBeenCalledWith(platformMock);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of platform', async () => {
      const platforms = await controller.findAll();
      expect(platforms).toEqual([new ReturnSalePlatformDto(platformMock)]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a platform', async () => {
      const platform = await controller.findOne(platformMock.id);
      expect(platform).toEqual(new ReturnSalePlatformDto(platformMock));
      expect(service.findOne).toHaveBeenCalledWith(platformMock.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return error if platform is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      await expect(controller.findOne(platformMock.id)).rejects.toThrow();
      expect(service.findOne).toHaveBeenCalledWith(platformMock.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a platform', async () => {
      const platform = await controller.update(platformMock.id, platformMock);
      expect(platform).toEqual(new ReturnSalePlatformDto(platformMock));
      expect(service.update).toHaveBeenCalledWith(
        platformMock.id,
        platformMock,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should return error if platform is not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      await expect(
        controller.update(platformMock.id, platformMock),
      ).rejects.toThrow();
      expect(service.update).toHaveBeenCalledWith(
        platformMock.id,
        platformMock,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should delete a platform', async () => {
      const platform = await service.remove(platformMock.id);

      expect(platform).toEqual(returnDeleteMock);
    });

    it('should return error if platform is not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new Error('Platform not found'));
      await expect(service.remove(platformMock.id)).rejects.toThrow();
      expect(service.remove).toHaveBeenCalledWith(platformMock.id);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
