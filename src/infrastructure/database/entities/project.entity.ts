import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IProject } from 'src/domain/interfaces/project.interface'
import { Task } from './task.entity'
import { User } from './user.entity'

@Entity('project')
export class Project implements IProject {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', nullable: false })
  name: string

  @Column({ name: 'description', nullable: false })
  description: string

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[]

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn()
  user: User
}
