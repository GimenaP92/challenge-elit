import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService (e2e)', () => {
  let app: INestApplication;
  let userRepo: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepo = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET) should return all users', async () => {
    const user = await userRepo.save({ name: 'Test', email: 'test@test.com', password: '123' });

    await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.some((u: any) => u.id === user.id)).toBeTruthy(); 
        });

  });

  it('/users (POST) should create a user', async () => {
    const newUser = { name: 'Nuevo', email: 'nuevo@test.com', password: '123' };

    await request(app.getHttpServer())
      .post('/users')
      .send(newUser)
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(newUser.name);
      });
  });
});
