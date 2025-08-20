import { Module } from '@nestjs/common'
import { UseCasesModule } from './use-cases/use-cases.module'
import { TasksModule } from './use-cases/tasks/tasks.module'
import { UsersModule } from './use-cases/users/users.module'
import { ProjectsModule } from './use-cases/projects/projects.module'

@Module({
  imports: [UseCasesModule, TasksModule, UsersModule, ProjectsModule],
})
export class DomainModule {}
