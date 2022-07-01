import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { IPasswordHasher } from './interfaces/password-hasher.interface';
import { TokenManager } from './token-manager';
import { UnauthorizedException } from '@nestjs/common';
import { AuthUser } from './auth-user.entity';

describe('AuthService', () => {
  let service: AuthService;

  const testUsername = 'username';
  const testPassword = 'password';
  const testHash = 'dfsdfsdfk';
  const testToken = 'sdfsdfsdfsdfsfffff';
  const testId = 'id';

  const testUser = new User(testId, testUsername, testHash);
  const testAuthUser = new AuthUser(testId, testUsername);

  const userRepository = {
    findByUsername: jest.fn().mockImplementation(() => testUser),
    create: jest.fn(),
  };

  const passwordHasher = {
    compare: jest.fn().mockImplementation(() => true),
    hash: jest.fn().mockImplementation(() => testHash),
  };

  const tokenManager = {
    createToken: jest.fn().mockImplementation(() => testToken),
    validateTokenAndFetchData: jest.fn().mockImplementation(() => testAuthUser),
  };

  beforeEach(async () => {
    service = new AuthService(
      passwordHasher as unknown as IPasswordHasher,
      userRepository as unknown as UserRepository,
      tokenManager as unknown as TokenManager,
    );
  });

  describe('.loginUserAndGetToken', () => {
    const callLoginUserAndGetTokenMethod = async (
      username = testUsername,
      password = testPassword,
    ) => {
      return await service.loginUserAndGetToken(username, password);
    };

    it('Should call user repository findByUsername method with given username as parameter', async () => {
      await callLoginUserAndGetTokenMethod();

      expect(userRepository.findByUsername).toBeCalledWith(testUsername);
    });
    it('Should throw UnauthorizedException When user does not exist', async () => {
      userRepository.findByUsername.mockImplementationOnce(() => null);
      expect(callLoginUserAndGetTokenMethod()).rejects.toThrow(
        new UnauthorizedException(),
      );
    });
    it('Should call passwordHasher compare method with given password and hash returned from repository', async () => {
      await callLoginUserAndGetTokenMethod();

      expect(passwordHasher.compare).toBeCalledWith(testPassword, testHash);
    });
    it('Should throw UnauthorizedException When passwords are not the same', async () => {
      passwordHasher.compare.mockImplementationOnce(() => false);

      expect(callLoginUserAndGetTokenMethod).rejects.toThrow(
        new UnauthorizedException(),
      );
    });
    it('Should call tokenManager createToken method with user id', async () => {
      await callLoginUserAndGetTokenMethod();

      expect(tokenManager.createToken).toBeCalledWith(
        { id: testId, username: testUsername },
        expect.anything(),
      );
    });
    it('Should return token When user exist and password is valid', async () => {
      const result = await callLoginUserAndGetTokenMethod();

      expect(result).toBe(testToken);
    });
  });

  describe('.registerUser', () => {
    const callRegisterUserMethod = async () => {
      return await service.registerUser(testUsername, testPassword);
    };

    it('Should call passwordHasher hash method with password given as argument', async () => {
      await callRegisterUserMethod();

      expect(passwordHasher.hash).toBeCalledWith(
        testPassword,
        expect.anything(),
      );
    });

    it('Should run userRepository create method with user entity instance with given name and hash returned from hasher', async () => {
      await callRegisterUserMethod();

      expect(userRepository.create).toBeCalledWith(
        new User(undefined, testUsername, testHash),
      );
    });
    it('Should return true', async () => {
      const result = await callRegisterUserMethod();

      expect(result).toBe(true);
    });
  });

  describe('.fetchAuthUserIfValid', () => {
    const callFetchAuthUserIfValid = async (token = testToken) => {
      return await service.fetchAuthUserIfValid(token);
    };
    it('Should return false When token is empty', async () => {
      const result = await callFetchAuthUserIfValid('');

      expect(result).toBe(false);
    });
    it('Should call tokenManager validateTokenAndFetchData method with given token When token is not empty', async () => {
      await callFetchAuthUserIfValid();

      expect(tokenManager.validateTokenAndFetchData).toBeCalledWith(testToken);
    });
    it('Should return false When token is invalid', async () => {
      tokenManager.validateTokenAndFetchData.mockImplementationOnce(
        () => false,
      );
      const result = await callFetchAuthUserIfValid();

      expect(result).toBe(false);
    });
    it('Should return authUser returned by tokenManager When token is valid', async () => {
      const result = await callFetchAuthUserIfValid();

      expect(result).toBe(testAuthUser);
    });
  });
});
