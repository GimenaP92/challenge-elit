import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { Task } from '../src/modules/tasks/entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TasksController (E2E)', () => {
  let app: INestApplication;
  let repo: Repository<Task>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repo = moduleFixture.get<Repository<Task>>(getRepositoryToken(Task));
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await repo.clear();
  });

  it('GET /tasks -> should return empty array initially', async () => {
    await request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(0);
      });
  });

  it('POST /tasks -> should create a new task', async () => {
    const newTask = { title: 'Test Task', description: 'E2E test' };

    await request(app.getHttpServer())
      .post('/tasks')
      .send(newTask)
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe(newTask.title);
      });
  });

  it('GET /tasks -> should return the created task', async () => {
    const task = await repo.save({ title: 'Task 1', description: 'desc' });

    await request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect(res => {
        expect(res.body.some((t: any) => t.id === task.id)).toBeTruthy();
      });
  });

it('PUT /tasks/:id -> should update a task', async () => {
  const task = await repo.save({ title: 'Old Title', description: 'desc' });

  await request(app.getHttpServer())
    .put(`/tasks/${task.id}`) 
    .send({ title: 'Updated Title' })
    .expect(200)
    .expect(res => {
      expect(res.body.title).toBe('Updated Title');
    });
});


  it('DELETE /tasks/:id -> should delete a task', async () => {
    const task = await repo.save({ title: 'To delete', description: 'desc' });

    await request(app.getHttpServer())
      .delete(`/tasks/${task.id}`)
      .expect(200);

    const found = await repo.findOneBy({ id: task.id });
    expect(found).toBeNull();
  });
});
