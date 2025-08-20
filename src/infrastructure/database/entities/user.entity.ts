import { IProject } from 'src/domain/interfaces/project.interface'
import { ITask } from 'src/domain/interfaces/task.interface'
import { IUser } from 'src/domain/interfaces/user.interface'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Project } from './project.entity'
import { Task } from './task.entity'

@Entity('user')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'firstName', nullable: false })
  firstName: string

  @Column({ name: 'lastName', nullable: false })
  lastName: string

  @Column({ name: 'email', nullable: false, unique: true })
  email: string

  @Column({ name: 'password', nullable: false })
  password: string

  @OneToMany(() => Project, (project) => project.user)
  projects: IProject[]

  @OneToMany(() => Task, (task) => task.user)
  tasks: ITask[]
}
