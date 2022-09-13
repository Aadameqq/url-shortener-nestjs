import { RedirectService } from './redirect.service';
import { Redirect } from './redirect.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

describe('RedirectsService', () => {
  let service: RedirectService;

  const testId = 'id';
  const testUrl = 'url';
  const testOwner = new User('usrname', 'passwd');
  testOwner.redirects = [];
  const testRedirect = new Redirect(testUrl, testOwner);

  const redirectRepository = {
    findOneBy: jest.fn().mockImplementation(() => testRedirect),
    save: jest.fn(),
  };

  const userRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    service = new RedirectService(
      redirectRepository as unknown as Repository<Redirect>,
      userRepository as unknown as Repository<User>,
    );
    jest.clearAllMocks();
  });

  describe('.getUrlById', () => {
    const callGetUrlById = async () => {
      return await service.getUrlById(testId);
    };

    it('Should call redirectRepository readById method with given as parameter id', async () => {
      await callGetUrlById();

      expect(redirectRepository.findOneBy).toBeCalledWith({ id: testId });
    });
    it('Should throw NotFound exception when redirect does not exist', () => {
      redirectRepository.findOneBy.mockImplementationOnce(() => false);

      expect(callGetUrlById).rejects.toThrow(new NotFoundException());
    });
    it('Should call redirectRepository save method with id given as parameter', async () => {
      await callGetUrlById();

      const expectedRedirect = {
        ...testRedirect,
        useCount: 1,
      };

      expect(redirectRepository.save).toBeCalledWith(expectedRedirect);
    });
    it('Should return url from repository When redirect exists', async () => {
      const result = await callGetUrlById();

      expect(result).toBe(testUrl);
    });
  });

  describe('.create', () => {
    const callCreate = async () => {
      return await service.create(testOwner, testRedirect);
    };

    it('Should call userRepository save method with user with given redirect added to redirects array ', async () => {
      await callCreate();

      const expectedUser = {
        ...testOwner,
        redirects: [testRedirect],
      };

      expect(userRepository.save).toBeCalledWith(expectedUser);
    });
    it('Should return created redirect', async () => {
      const result = await callCreate();

      expect(result).toEqual(testRedirect);
    });
  });
});
