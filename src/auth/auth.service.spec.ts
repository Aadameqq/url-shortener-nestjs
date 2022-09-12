import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { IPasswordHasher } from './interfaces/password-hasher.interface';
import { TokenManager } from './token-manager';
import { UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;

  const testUsername = 'username';
  const testPassword = 'password';
  const testHash = 'dfsdfsdfk';
  const testToken = 'sdfsdfsdfsdfsfffff';
  const testId = 'id';

  const testUser = new User(testUsername, testHash);
  testUser.id = testId;

  const userRepository = {
    findOneBy: jest.fn().mockImplementation(() => testUser),
    findOne: jest.fn().mockImplementation(() => testUser),
    save: jest.fn(),
  };

  const passwordHasher = {
    compare: jest.fn().mockImplementation(() => true),
    hash: jest.fn().mockImplementation(() => testHash),
  };

  const tokenManager = {
    createToken: jest.fn().mockImplementation(() => testToken),
    validateTokenAndFetchData: jest.fn().mockImplementation(() => ({
      id: testId,
    })),
  };

  beforeEach(async () => {
    service = new AuthService(
      passwordHasher as unknown as IPasswordHasher,
      userRepository as unknown as Repository<User>,
      tokenManager as unknown as TokenManager,
    );
    jest.clearAllMocks();
  });

  describe('.loginUserAndGetToken', () => {
    const callLoginUserAndGetTokenMethod = async (
      username = testUsername,
      password = testPassword,
    ) => {
      return await service.loginUserAndGetToken(username, password);
    };

    it('Should call search for user with given username in database', async () => {
      await callLoginUserAndGetTokenMethod();

      expect(userRepository.findOneBy).toBeCalledWith({
        username: testUsername,
      });
    });
    it('Should throw UnauthorizedException When user does not exist', async () => {
      userRepository.findOneBy.mockImplementationOnce(() => null);
      expect(callLoginUserAndGetTokenMethod()).rejects.toThrow(
        new UnauthorizedException(),
      );
    });
    it('Should compare given password with password found in database', async () => {
      await callLoginUserAndGetTokenMethod();

      expect(passwordHasher.compare).toBeCalledWith(testPassword, testHash);
    });
    it('Should throw UnauthorizedException When passwords are not the same', async () => {
      passwordHasher.compare.mockImplementationOnce(() => false);

      expect(callLoginUserAndGetTokenMethod).rejects.toThrow(
        new UnauthorizedException(),
      );
    });
    it('Should create a token for user', async () => {
      await callLoginUserAndGetTokenMethod();

      expect(tokenManager.createToken).toBeCalledWith(
        { id: testId },
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

    it('Should hash given password', async () => {
      await callRegisterUserMethod();

      expect(passwordHasher.hash).toBeCalledWith(
        testPassword,
        expect.anything(),
      );
    });

    it('Should save user to database with given username and hashed password', async () => {
      await callRegisterUserMethod();

      expect(userRepository.save).toBeCalledWith(
        expect.objectContaining({
          username: testUsername,
          password: testHash,
        }),
      );
    });
    it('Should return true', async () => {
      const result = await callRegisterUserMethod();

      expect(result).toBe(true);
    });
  });

  describe('.fetchAuthUserIfValid', () => {
    const callFetchAuthUserIfValid = async (token = testToken) => {
      return await service.fetchUserIfValid(token);
    };
    it('Should return false When token is empty', async () => {
      const result = await callFetchAuthUserIfValid('');

      expect(result).toBe(false);
    });
    it('Should call tokenManager validate and fetch data from given token When token is not empty', async () => {
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
    it("Should search for a user with id from token and user's redirects When token is valid", async () => {
      await callFetchAuthUserIfValid();

      expect(userRepository.findOne).toBeCalledWith({
        where: { id: testId },
        relations: { redirects: true },
      });
    });
    it('Should return user found in database When token is valid', async () => {
      const result = await callFetchAuthUserIfValid();

      expect(result).toBe(testUser);
    });
  });
});
