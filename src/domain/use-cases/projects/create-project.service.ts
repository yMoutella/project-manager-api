import { Injectable } from '@nestjs/common'
import { IProject } from 'src/domain/interfaces/project.interface'
import { CreateProjectDto } from 'src/gateways/controllers/projects/dtos/create-project.dto'
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service'
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service'

interface ICreateProjectPayload {
  project: CreateProjectDto
  userId: string
}

@Injectable()
export class CreateProjectService {
  constructor(
    private readonly projectsRepository: ProjectsRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(payload: ICreateProjectPayload): Promise<IProject> {
    const userData = await this.usersRepository.findById(payload.userId)

    if (!userData) {
      throw new Error('User not found')
    }

    const createdProject = await this.projectsRepository.add({
      ...payload.project,
    })

    if (!createdProject) {
      throw new Error('Erro ao criar projeto')
    }

    return createdProject
  }
}
