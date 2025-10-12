import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './config/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const options = typeOrmConfig();
        if (!options) {
          throw new Error('La configuración de TypeORM no está definida');
        }
        return {
          ...options,
          autoLoadEntities: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
