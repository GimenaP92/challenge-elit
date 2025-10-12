import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error('Usuario ya registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(newUser);

    const { password: _, ...userNoPassword } = savedUser;
    return userNoPassword;
  }

 async findAll() {
  try {
    return await this.userRepository.find();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
    }
    throw new Error('Error desconocido al obtener todos los usuarios');
  }
}

async findOneById(id: string) {
  try {
    return await this.userRepository.findOne({ where: { id } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener usuario por ID: ${error.message}`);
    }
    throw new Error('Error desconocido al obtener usuario por ID');
  }
}


async findOneByEmail(email: string) {
  try {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null; 
    }
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener usuario por email: ${error.message}`);
    }
    throw new Error('Error desconocido al obtener usuario por email');
  }
}

}