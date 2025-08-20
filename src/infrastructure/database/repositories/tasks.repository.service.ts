import { Injectable } from '@nestjs/common'
import { ITask } from 'src/domain/interfaces/task.interface'
import { ITasksRepository } from 'src/domain/repositories/tasks-repository.interface'
import { DeepPartial, Repository } from 'typeorm'
import { Task } from '../entities/task.entity'
import { DataSource } from 'typeorm'

@Injectable()
export class TasksRepositoryService
  extends Repository<Task>
  implements ITasksRepository
{
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager())
  }

  findAll(id: string): Promise<ITask[]> {
    return this.findBy({ id })
  }
  findById(id: string): Promise<ITask | null> {
    return this.findOneBy({ id })
  }
  add(payload: DeepPartial<ITask>): Promise<ITask> {
    return this.save(payload)
  }
  updateById(id: string, payload: DeepPartial<ITask>) {
    return this.update(id, payload)
  }
}
