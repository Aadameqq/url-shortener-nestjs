import { RedirectService } from './redirect.service';
import { RedirectRepository } from './redirect.repository';
import { Redirect } from './redirect.entity';
import { NotFoundException } from '@nestjs/common';

describe('UrlsService', () => {
  let service: RedirectService;

  const testId = 'id';
  const testUrl = 'url';
  const testOwnerId = 'ownerid';
  const testRedirect = new Redirect(testId, testUrl, testOwnerId);

  const redirectRepository = {
    readById: jest.fn().mockImplementation(() => testRedirect),
    incrementUseCountById: jest.fn(),
    create: jest.fn().mockImplementation(() => testRedirect),
    readAllByOwnerId: jest.fn().mockImplementation(() => [testRedirect]),
  };

  beforeEach(async () => {
    service = new RedirectService(
      redirectRepository as unknown as RedirectRepository,
    );
  });

  describe('.getUrlById', () => {
    const callGetUrlById = async () => {
      return await service.getUrlById(testId);
    };

    it('Should call redirectRepository readById method with given as parameter id', async () => {
      await callGetUrlById();

      expect(redirectRepository.readById).toBeCalledWith(testId);
    });
    it('Should throw NotFound exception when redirect does not exist', () => {
      redirectRepository.readById.mockImplementationOnce(() => false);

      expect(callGetUrlById).rejects.toThrow(new NotFoundException());
    });
    it('Should call redirectRepository incrementUseCountById method with id given as parameter', async () => {
      await callGetUrlById();

      expect(redirectRepository.incrementUseCountById).toBeCalledWith(testId);
    });
    it('Should return url from repository When redirect exists', async () => {
      const result = await callGetUrlById();

      expect(result).toBe(testUrl);
    });
  });

  describe('.create', () => {
    const callCreate = async () => {
      return await service.create(testRedirect);
    };

    it('Should call redirectRepository create method with given redirects entity instance', async () => {
      await callCreate();

      expect(redirectRepository.create).toBeCalledWith(testRedirect);
    });
    it('Should return created redirect', async () => {
      const result = await callCreate();

      expect(result).toEqual(testRedirect);
    });
  });

  describe('.readAllByOwnerId', () => {
    const callReadAllByOwnerId = async () => {
      return await service.readAllByOwnerId(testOwnerId);
    };

    it('Should call redirectRepository readAllByOwnerId with ownerId given as parameter', async () => {
      await callReadAllByOwnerId();

      expect(redirectRepository.readAllByOwnerId).toBeCalledWith(testOwnerId);
    });
    it('Should return redirects array from repository', async () => {
      const result = await callReadAllByOwnerId();

      expect(result).toEqual([testRedirect]);
    });
  });
});
