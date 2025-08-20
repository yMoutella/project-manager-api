import { IProject } from '../interfaces/project.interface'
import { ITask } from '../interfaces/task.interface'
import { IUser } from '../interfaces/user.interface'

export class User implements IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  projects: IProject[]
  tasks: ITask[]
}
