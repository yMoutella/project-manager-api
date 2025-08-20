import { Injectable } from '@nestjs/common'
import { IUser } from 'src/domain/interfaces/user.interface'
import { CreateUserDto } from 'src/gateways/controllers/users/dtos/create-user.dto'
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service'

@Injectable()
export class CreateUserService {
  constructor(private readonly usersRepository: UsersRepositoryService) {}

  async execute(user: CreateUserDto): Promise<IUser> {
    const createdUser = await this.usersRepository.add(user)

    if (!createdUser) {
      throw new Error('O Usuário não pode ser criado')
    }

    return createdUser
  }
}
