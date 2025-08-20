import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ITask } from 'src/domain/interfaces/task.interface'
import { Project } from './project.entity'
import { User } from './user.entity'

@Entity('task')
export class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', nullable: false })
  name: string

  @Column({ name: 'status', nullable: false })
  status: 'pending' | 'completed'

  @ManyToOne(() => Project, (project) => project.tasks, {
    cascade: true,
    nullable: false,
  })
  project: Project

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  user: User
}
