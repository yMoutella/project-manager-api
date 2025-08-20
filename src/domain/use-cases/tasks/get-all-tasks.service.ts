import { Injectable } from '@nestjs/common'
import { ITask } from 'src/domain/interfaces/task.interface'
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service'
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service'
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service'

interface IGetAllTasksServicePayload {
  userId: string
}

@Injectable()
export class GetAllTasksService {
  constructor(
    private readonly tasksRepository: TasksRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(payload: IGetAllTasksServicePayload): Promise<ITask[]> {
    const userData = await this.usersRepository.findById(payload.userId)

    if (!userData) {
      throw new Error('Usuário não encontrado')
    }

    const tasks = await this.tasksRepository.findAll(payload.userId)

    if (!tasks) {
      throw new Error('Erro ao buscar tarefas')
    }

    return tasks
  }
}
