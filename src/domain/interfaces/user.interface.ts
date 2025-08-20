import { IProject } from './project.interface'
import { ITask } from './task.interface'

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  projects: IProject[]
  tasks: ITask[]
}
