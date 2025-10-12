import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

  
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /users -> should register a new user', async () => {
    const newUser = {
      name: 'Test User',
      email: `testuser${Date.now()}@example.com`, 
      password: 'Pass12word', 
    };

    const res = await request(app.getHttpServer())
      .post('/users')   
      .send(newUser)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(newUser.name);

    // Guardamos para login
    const credentials = { email: newUser.email, password: newUser.password };

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send(credentials)
      .expect(201);

    expect(loginRes.body).toHaveProperty('access_token');
  });

  it('POST /auth/login -> should fail with wrong password', async () => {
    const wrongCredentials = {
      email: 'nonexistent@example.com',
      password: 'WrongPass12',
    };

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(wrongCredentials)
      .expect(401); 
  });
});
