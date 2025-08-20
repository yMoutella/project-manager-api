import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common'
import { CreateProjectService } from 'src/domain/use-cases/projects/create-project.service'
import { GetAllProjectsService } from 'src/domain/use-cases/projects/get-all-projects.service'
import { GetProjectByIdService } from 'src/domain/use-cases/projects/get-project-by-id.service'
import { CreateProjectDto } from './dtos/create-project.dto'

const userId = '1'
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly getAllProjectsService: GetAllProjectsService,
    private readonly getProjectByIdService: GetProjectByIdService,
    private readonly createProjectService: CreateProjectService,
  ) {}

  @Get()
  async getAllProjects() {
    try {
      return await this.getAllProjectsService.execute(userId)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    try {
      return await this.getProjectByIdService.execute({
        userId,
        projectId: id,
      })
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  @Post()
  async createProject(@Body() projectDto: CreateProjectDto) {
    try {
      return await this.createProjectService.execute({
        userId,
        project: projectDto,
      })
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }
}
