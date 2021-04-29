import { ResearchUser } from '@models/ResearchUser'
import { ResearchesUsersRepository } from '../repositories/ResearchesUsersRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { User } from '@models/User'
import { Research } from '@models/Research'
import { UsersRepository } from '../repositories/UsersRepository'
import { ResearchesRepository } from '../repositories/ResearchesRepository'
import { resolve } from 'path'
import SendMailService, { ISendMail } from './SendMailService'

interface ICreateResearchUser {
  email: string;
  researchId: string;
}

class ResearchesUsersService {
  private researchesUsersRepository: Repository<ResearchUser>
  private usersRepository: Repository<User>
  private researchesRepository: Repository<Research>

  constructor () {
    this.researchesUsersRepository = getCustomRepository(ResearchesUsersRepository)
    this.usersRepository = getCustomRepository(UsersRepository)
    this.researchesRepository = getCustomRepository(ResearchesRepository)
  }

  async create ({ email, researchId }: ICreateResearchUser) {
    const user = await this.usersRepository.findOne({ email })

    if (!user) {
      throw new Error('User does not exist')
    }

    const research = await this.researchesRepository.findOne({ id: researchId })

    if (!research) {
      throw new Error('Research does not exist')
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

    const variables = {
      name: user.name,
      title: research.title,
      description: research.description,
      id: user.id,
      link: process.env.URL_MAIL
    }

    const researchUserAlreadyExists = await this.researchesUsersRepository.findOne({
      where: [{ userId: user.id }, { value: null }],
      relations: ['user', 'research']
    })

    if (researchUserAlreadyExists) {
      const researchUser = await this.MailService(researchUserAlreadyExists, {
        to: email, subject: research.title, variables, path: npsPath
      })

      return researchUser
    }

    const researchUser = this.researchesUsersRepository.create({
      userId: user.id,
      researchId
    })

    await this.researchesUsersRepository.save(researchUser)

    await this.MailService(researchUserAlreadyExists, {
      to: email, subject: research.title, variables, path: npsPath
    })

    return researchUser
  }

  private async MailService (researchUserAlreadyExists: ResearchUser, { to, subject, variables, path }: ISendMail) {
    if (process.env.NODE_ENV !== 'test') {
      if (researchUserAlreadyExists) {
        await SendMailService.execute({ to, subject, variables, path })
        return researchUserAlreadyExists
      }

      await SendMailService.execute({ to, subject, variables, path })
    }
  }
}

export { ResearchesUsersService }
