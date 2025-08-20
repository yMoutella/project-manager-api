import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateTaskService } from 'src/domain/use-cases/tasks/create-task.service'
import { GetAllTasksService } from 'src/domain/use-cases/tasks/get-all-tasks.service'
import { GetTaskByIdService } from 'src/domain/use-cases/tasks/get-task-by-id.service'
import { CreateTaskDto } from './dtos/create-task.dto'

const userId = '1'
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly getTaskByIdService: GetTaskByIdService,
    private readonly getAllTasksService: GetAllTasksService,
    private readonly createTaskService: CreateTaskService,
  ) {}

  @Get()
  async getAllTasks() {
    try {
      return await this.getAllTasksService.execute({
        userId,
      })
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    try {
      return await this.getTaskByIdService.execute({
        taskId: id,
        userId,
      })
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.createTaskService.execute({
        task: createTaskDto,
        userId,
      })
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }
}
