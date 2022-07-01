import { UrlsService } from './urls.service';
import { UrlsRepository } from './urls.repository';
import { Url } from './url.entity';
import { NotFoundException } from '@nestjs/common';

describe('UrlsService', () => {
  let service: UrlsService;

  const testId = 'id';
  const testUrl = 'url';
  const testOwnerId = 'ownerid';
  const testUrlObject = new Url(testId, testUrl, testOwnerId);

  const urlsRepository = {
    readById: jest.fn().mockImplementation(() => testUrlObject),
    incrementUseCountById: jest.fn(),
    create: jest.fn(),
    readAllByOwnerId: jest.fn().mockImplementation(() => [testUrlObject]),
  };

  beforeEach(async () => {
    service = new UrlsService(urlsRepository as unknown as UrlsRepository);
  });

  describe('.getUrlById', () => {
    const callGetUrlById = async () => {
      return await service.getUrlById(testId);
    };

    it('Should call urlsRepository readById method with given as parameter id', async () => {
      await callGetUrlById();

      expect(urlsRepository.readById).toBeCalledWith(testId);
    });
    it('Should throw NotFound exception when urlObject does not exist', () => {
      urlsRepository.readById.mockImplementationOnce(() => false);

      expect(callGetUrlById).rejects.toThrow(new NotFoundException());
    });
    it('Should call urlsRepository incrementUseCountById method with id given as parameter', async () => {
      await callGetUrlById();

      expect(urlsRepository.incrementUseCountById).toBeCalledWith(testId);
    });
    it('Should return url from repository When urlObject exists', async () => {
      const result = await callGetUrlById();

      expect(result).toBe(testUrl);
    });
  });

  describe('.create', () => {
    const callCreate = async () => {
      return await service.create(testUrlObject);
    };

    it('Should call urlsRepository create method with given url entity instance', async () => {
      await callCreate();

      expect(urlsRepository.create).toBeCalledWith(testUrlObject);
    });
  });

  describe('.readAllByOwnerId', () => {
    const callReadAllByOwnerId = async () => {
      return await service.readAllByOwnerId(testOwnerId);
    };

    it('Should call urlsRepository readAllByOwnerId with ownerId given as parameter', async () => {
      await callReadAllByOwnerId();

      expect(urlsRepository.readAllByOwnerId).toBeCalledWith(testOwnerId);
    });
    it('Should return url objects array from repository', async () => {
      const result = await callReadAllByOwnerId();

      expect(result).toEqual([testUrlObject]);
    });
  });
});
