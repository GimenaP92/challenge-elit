import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @IsEmail({}, { message: 'Email no válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @Matches(/^(?=.*[A-Z])(?=(?:.*\d){2,}).+$/, {
    message: 'La contraseña debe tener al menos una mayúscula y 2 números',
  })
  password: string;
}
