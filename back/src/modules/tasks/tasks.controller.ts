import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiBody({
    description: 'Datos necesarios para crear una tarea',
    schema: {
      example: {
        title: 'Formularios de ingreso',
        description: 'Formularios de ingreso y registro de usuarios',
        status: 'Pendiente',
        userId: 'uuid-del-usuario', 
      },
    },
  })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      const task = await this.tasksService.create(createTaskDto);
      return task;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error desconocido al crear la tarea');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.tasksService.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error desconocido al obtener tareas');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const task = await this.tasksService.findOne(id);
      if (!task) {
        throw new Error('Tarea no encontrada');
      }
      return task;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error desconocido al obtener la tarea');
    }
  }
  
    @Get('user/:userId')
    async getTasksByUser(@Param('userId') userId: string) {
      return this.tasksService.findByUserId(userId);
    }

  @Put(':id')
  @ApiBody({ type: UpdateTaskDto })
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const updatedTask = await this.tasksService.update(id, updateTaskDto);
      return updatedTask;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error desconocido al actualizar la tarea');
    }
  }

  @Delete(':id')
  async removeTask(@Param('id') id: string) {
    try {
      return await this.tasksService.remove(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error desconocido al eliminar la tarea');
    }
  }
}
