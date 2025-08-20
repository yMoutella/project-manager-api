import { Injectable } from '@nestjs/common'
import { ITask } from 'src/domain/interfaces/task.interface'
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service'
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service'

interface IGetTaskByIdServicePayload {
  taskId: string
  userId: string
}

@Injectable()
export class GetTaskByIdService {
  constructor(
    private readonly tasksRepository: TasksRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(payload: IGetTaskByIdServicePayload): Promise<ITask> {
    const userData = await this.usersRepository.findById(payload.userId)

    if (!userData) {
      throw new Error('Usuário não encontrado')
    }

    const task = await this.tasksRepository.findById(payload.taskId)

    if (!task) {
      throw new Error('Erro ao buscar tarefa')
    }

    return task
  }
}
