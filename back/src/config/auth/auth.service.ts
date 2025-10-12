import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../modules/users/users.service';
import { JwtPayload } from './jwt.interface';
import { loginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // Valida usuario y contraseña
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const { password: _, ...userNoPassword } = user;
    return userNoPassword;
  }

  // Login con DTO
  async login(loginDto: loginUserDto) {
    const validatedUser = await this.validateUser(loginDto.email, loginDto.password);

    const payload: JwtPayload = {
      username: validatedUser.name,
      sub: validatedUser.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: validatedUser,
    };
  }
}
