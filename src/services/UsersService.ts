import { UsersRepository } from '../repositories/UsersRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { User } from '@models/User'

interface ICreateUser {
  name: string;
  email: string
}

class UsersService {
  private usersRepository: Repository<User>

  constructor () {
    this.usersRepository = getCustomRepository(UsersRepository)
  }

  async create ({ name, email }: ICreateUser) {
    const userAlreadyExists = await this.usersRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('User already exists!')
    }

    const user = this.usersRepository.create({
      name,
      email
    })

    await this.usersRepository.save(user)

    return user
  }
}

export { UsersService }
