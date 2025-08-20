import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import { CreateUserService } from 'src/domain/use-cases/users/create-user.service'
import { GetUserByIdService } from 'src/domain/use-cases/users/get-user-by-id.service'
import { CreateUserDto } from './dtos/create-user.dto'

const userId = '1'

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly createUserService: CreateUserService,
  ) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      return await this.getUserByIdService.execute(id)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.createUserService.execute(createUserDto)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }
}
