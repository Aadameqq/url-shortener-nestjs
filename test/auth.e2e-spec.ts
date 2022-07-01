import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Model } from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import { getModelToken } from '@nestjs/mongoose';
import { AppModule } from '../src/app.module';
import { User } from '../src/user/user.entity';
import { SALT_ROUNDS } from '../src/auth/auth.constants';
import { LogInterceptor } from '../src/log/log.interceptor';

describe('AuthController /auth/', () => {
  let app: INestApplication;
  let userModel: Model<User>;

  beforeAll(async () => {
    dotenv.config({ path: path.join(__dirname, '../', '.development.env') });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(LogInterceptor)
      .useValue(null)
      .compile();

    app = moduleFixture.createNestApplication();

    userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/login/', () => {
    let testUser;

    beforeAll(async () => {
      await userModel.remove({});

      const unhashedPassword = 'TestPassword';

      const hashedPassword = await bcrypt.hash(unhashedPassword, SALT_ROUNDS);

      const document = new userModel({
        username: 'TestUsername',
        password: hashedPassword,
      });

      testUser = document;
      testUser.unhashedPassword = unhashedPassword;

      await document.save();
    });

    const callEndPoint = () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Accept', 'application/json');
    };

    it('Should return status code 401 When username is invalid', () => {
      return callEndPoint()
        .send({
          username: 'Invalid',
          password: testUser.unhashedPassword,
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });
    it('Should return status code 401 When password is invalid', () => {
      return callEndPoint()
        .send({
          username: testUser.username,
          password: 'Invalid',
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });
    it('Should return valid token with user data in it When username and password is valid', (done) => {
      callEndPoint()
        .send({
          username: testUser.username,
          password: testUser.unhashedPassword,
        })
        .expect(HttpStatus.OK)
        .end((err, res) => {
          if (err) return done(err);

          const { token } = JSON.parse(res.text);

          const data = jwt.verify(token, process.env.JWT_SECRET);

          if (data.id == testUser._id && data.username == testUser.username)
            return done();
          return done(
            new Error(
              `Object received from token and testUser are not the same. ${data.id} !== ${testUser._id} or ${data.username} !== ${testUser.username}`,
            ),
          );
        });
    });
  });
});
