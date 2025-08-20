import { DeepPartial } from 'typeorm'
import { IUser } from '../interfaces/user.interface'

export interface IUsersRepository {
  findById(id: string): Promise<IUser | null>
  add(payload: DeepPartial<IUser>): Promise<IUser>
}
