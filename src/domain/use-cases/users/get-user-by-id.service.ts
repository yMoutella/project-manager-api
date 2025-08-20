import { Injectable } from '@nestjs/common'
import { IUser } from 'src/domain/interfaces/user.interface'
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service'

@Injectable()
export class GetUserByIdService {
  constructor(private readonly usersRepository: UsersRepositoryService) {}

  async execute(id: string): Promise<IUser> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    return user
  }
}
