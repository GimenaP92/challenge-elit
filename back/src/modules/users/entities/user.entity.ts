import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Exclude } from 'class-transformer'; 

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;


  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Task, (tasks) => tasks.user, { nullable: true })
  tasks: Task[];
}
