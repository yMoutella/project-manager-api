import { Injectable } from '@nestjs/common'
import { ITask } from 'src/domain/interfaces/task.interface'
import { CreateTaskDto } from 'src/gateways/controllers/tasks/dtos/create-task.dto'
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service'
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service'
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service'

interface ICreateTaskServicePayload {
  task: CreateTaskDto
  userId: string
}

@Injectable()
export class CreateTaskService {
  constructor(
    private readonly tasksRepository: TasksRepositoryService,
    private readonly projectsRepository: ProjectsRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(payload: ICreateTaskServicePayload): Promise<ITask> {
    const userData = await this.usersRepository.findById(payload.userId)

    if (!userData) {
      throw new Error('Usuário não encontrado')
    }

    const projectData = await this.projectsRepository.findById(
      payload.task.projectId,
    )

    if (!projectData) {
      throw new Error('Projeto não encontrado')
    }

    const createdTask = await this.tasksRepository.add({
      ...payload.task,
    })

    if (!createdTask) {
      throw new Error('Erro ao criar tarefa')
    }

    return createdTask
  }
}
