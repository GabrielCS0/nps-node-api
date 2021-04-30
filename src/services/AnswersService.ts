import { ResearchUser } from '@models/ResearchUser'
import { ResearchesUsersRepository } from '../repositories/ResearchesUsersRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { AppError } from '../errors/AppError'

interface IAnswerExecute {
  value: number,
  id: string;
}

class AnswersService {
  private researchUsersRepository: Repository<ResearchUser>

  constructor () {
    this.researchUsersRepository = getCustomRepository(ResearchesUsersRepository)
  }

  async execute ({ value, id }: IAnswerExecute) {
    const researchUser = await this.researchUsersRepository.findOne({ id })

    if (!researchUser) {
      throw new AppError('User Research does not exists!')
    }

    researchUser.value = value

    await this.researchUsersRepository.save(researchUser)

    return researchUser
  }
}

export { AnswersService }
