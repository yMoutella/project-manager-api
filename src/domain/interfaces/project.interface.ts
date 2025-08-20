import { ITask } from './task.interface'
import { IUser } from './user.interface'

export interface IProject {
  id: string
  name: string
  description: string
  tasks: ITask[]
  user: IUser
}
