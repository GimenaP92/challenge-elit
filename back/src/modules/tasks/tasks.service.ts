import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear tarea
  async create(createTaskDto: CreateTaskDto) {
    try {
      const { title, description, status, userId } = createTaskDto as any;

      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new Error('Usuario no encontrado');

      const newTask = this.taskRepository.create({
        title,
        description,
        status: status || TaskStatus.PENDIENTE,
        user,
      });

      return await this.taskRepository.save(newTask);
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(`Error al crear tarea: ${error.message}`);
      throw new Error('Error desconocido al crear tarea');
    }
  }

  // Obtener todas las tareas
  async findAll() {
    try {
      return await this.taskRepository.find({ relations: ['user'] });
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(`Error al obtener todas las tareas: ${error.message}`);
      throw new Error('Error desconocido al obtener tareas');
    }
  }

  // Obtener tareas por usuario
  async findByUserId(userId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new Error('Usuario no encontrado');

      return await this.taskRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
        order: { createdAt: 'DESC' },
      });
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(`Error al obtener tareas del usuario: ${error.message}`);
      throw new Error('Error desconocido al obtener tareas del usuario');
    }
  }

  // Obtener una tarea por ID
  async findOne(id: string) {
    try {
      const task = await this.taskRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!task) throw new Error('Tarea no encontrada');
      return task;
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(`Error al obtener tarea por ID: ${error.message}`);
      throw new Error('Error desconocido al obtener tarea por ID');
    }
  }

  // Actualizar tarea
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.findOne(id);
      Object.assign(task, updateTaskDto);
      return await this.taskRepository.save(task);
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(`Error al actualizar tarea: ${error.message}`);
      throw new Error('Error desconocido al actualizar tarea');
    }
  }

  // Eliminar tarea
  async remove(id: string) {
    try {
      const task = await this.findOne(id);
      return await this.taskRepository.remove(task);
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(`Error al eliminar tarea: ${error.message}`);
      throw new Error('Error desconocido al eliminar tarea');
    }
  }
}
