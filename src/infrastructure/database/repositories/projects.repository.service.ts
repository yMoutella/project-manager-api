import { Injectable } from '@nestjs/common'
import { DataSource, DeepPartial, Repository } from 'typeorm'
import { Project } from '../entities/project.entity'
import { IProjectsRepository } from 'src/domain/repositories/projects-repository.interface'
import { IProject } from 'src/domain/interfaces/project.interface'

@Injectable()
export class ProjectsRepositoryService
  extends Repository<Project>
  implements IProjectsRepository
{
  constructor(dataSource: DataSource) {
    super(Project, dataSource.createEntityManager())
  }

  findAll(id: string): Promise<IProject[]> {
    return this.findBy({ id })
  }
  findById(id: string): Promise<IProject | null> {
    return this.findOneBy({ id })
  }
  add(payload: DeepPartial<IProject>): Promise<IProject> {
    return this.save(payload)
  }
}
