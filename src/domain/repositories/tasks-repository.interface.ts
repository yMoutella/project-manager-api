import { DeepPartial } from 'typeorm'
import { ITask } from '../interfaces/task.interface'

export interface ITasksRepository {
  findAll(id: string): Promise<ITask[]>
  findById(id: string): Promise<ITask | null>
  add(payload: DeepPartial<ITask>): Promise<ITask>
  updateById(id: string, payload: DeepPartial<ITask>)
}
