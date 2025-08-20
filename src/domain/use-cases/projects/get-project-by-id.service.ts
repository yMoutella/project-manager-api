import { Injectable } from '@nestjs/common'
import { IProject } from 'src/domain/interfaces/project.interface'
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service'
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service'

interface IGetProjectByIdServicePayload {
  userId: string
  projectId: string
}

@Injectable()
export class GetProjectByIdService {
  constructor(
    private readonly projectsRepository: ProjectsRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(payload: IGetProjectByIdServicePayload): Promise<IProject> {
    const { userId, projectId } = payload

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new Error('Projeto não encontrado')
    }

    return project
  }
}
