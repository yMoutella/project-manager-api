import { Injectable } from '@nestjs/common'
import { DataSource, DeepPartial, Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { IUsersRepository } from 'src/domain/repositories/user-repository.interface'
import { IUser } from 'src/domain/interfaces/user.interface'

@Injectable()
export class UsersRepositoryService
  extends Repository<User>
  implements IUsersRepository
{
  constructor(DataSource: DataSource) {
    super(User, DataSource.createEntityManager())
  }

  findById(id: string): Promise<IUser | null> {
    return this.findOneBy({ id })
  }
  add(payload: DeepPartial<IUser>): Promise<IUser> {
    return this.save(payload)
  }
}
