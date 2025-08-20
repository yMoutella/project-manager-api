import { PartialType } from '@nestjs/mapped-types'
import { CreateTaskDto } from './create-task.dto'
import { IsNotEmpty } from 'class-validator'

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty({ message: 'O ID da tarefa precisa ser definido' })
  id: string
}
