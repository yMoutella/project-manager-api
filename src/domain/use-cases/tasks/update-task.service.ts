import { Injectable } from '@nestjs/common'
import { ITask } from 'src/domain/interfaces/task.interface'
import { UpdateTaskDto } from 'src/gateways/controllers/tasks/dtos/update-task.dto'
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service'
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service'

interface IUpdateTaskServicePayload {
  task: UpdateTaskDto
  userId: string
}

@Injectable()
export class UpdateTaskService {
  constructor(
    private readonly tasksRepository: TasksRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(payload: IUpdateTaskServicePayload): Promise<ITask | null> {
    const userData = await this.usersRepository.findById(payload.userId)

    if (!userData) {
      throw new Error('Usuário não encontrado')
    }
    const task = this.tasksRepository.findById(payload.task.id)

    if (!task) {
      throw new Error('Erro ao atualizar tarefa')
    }

    await this.tasksRepository.updateById(payload.task.id, payload.task)

    return task
  }
}
