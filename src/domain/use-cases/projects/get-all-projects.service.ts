import { Injectable } from '@nestjs/common'
import { IProject } from 'src/domain/interfaces/project.interface'
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service'
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service'

@Injectable()
export class GetAllProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(userId: string): Promise<IProject[]> {
    const userData = await this.usersRepository.findById(userId)

    if (!userData) {
      throw new Error('Usuário não encontrado')
    }

    const projects = await this.projectsRepository.findAll(userId)

    if (!projects) {
      throw new Error('Erro ao recuperar projetos')
    }

    return projects
  }
}
